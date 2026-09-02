import { expect, test } from "bun:test"
import { buildStreamObserver } from "../transport-log/transport-log.module.code.ts"
import { buildEndInFlightOnce, type ObserverSlot } from "./observer-slot.module.code.ts"

const START_MS = 1_700_000_000_000

const END_MS = START_MS + 1_000

test("a slot holds the observer of the stream in flight or holds nothing", () => {
  const slot: ObserverSlot = { current: null }
  expect(slot.current).toBe(null)
  const observer = buildStreamObserver({ account: "one", path: "/v1", startMs: START_MS })
  slot.current = observer
  expect(slot.current).toBe(observer)
  slot.current = null
  expect(slot.current).toBe(null)
})

test("a slot carrying no end is a slot nothing ends", () => {
  const slot: ObserverSlot = { current: null }
  expect(slot.endInFlight).toBe(undefined)
})

test("a slot's end is what ends the stream that slot holds", () => {
  const observer = buildStreamObserver({ account: "one", path: "/v1", startMs: START_MS })
  let ended = 0
  observer.armTerminal(() => {
    ended += 1
  })
  const slot: ObserverSlot = {
    current: observer,
    endInFlight: buildEndInFlightOnce(() => {
      observer.onClientDisconnect?.("gone", END_MS)
    }),
  }
  slot.endInFlight?.()
  expect(ended).toBe(1)
})

test("a wrapped end runs the end handed in on the first call", () => {
  let ran = 0
  const end = buildEndInFlightOnce(() => {
    ran += 1
  })
  expect(ran).toBe(0)
  end()
  expect(ran).toBe(1)
})

test("a wrapped end called again runs the end handed in no further", () => {
  let ran = 0
  const end = buildEndInFlightOnce(() => {
    ran += 1
  })
  end()
  end()
  end()
  expect(ran).toBe(1)
})

test("a wrapped end is one-shot for the life of that wrapper", () => {
  let ran = 0
  const end = buildEndInFlightOnce(() => {
    ran += 1
  })
  for (let turn = 0; turn < 100; turn += 1) end()
  expect(ran).toBe(1)
})

test("two wrappers over the one end each run that end once", () => {
  let ran = 0
  const underneath = (): undefined => {
    ran += 1
  }
  const first = buildEndInFlightOnce(underneath)
  const second = buildEndInFlightOnce(underneath)
  first()
  first()
  second()
  second()
  expect(ran).toBe(2)
})

test("a wrapped end is marked as run before the end handed in is called", () => {
  let ran = 0
  let end: (() => undefined) | null = null
  end = buildEndInFlightOnce(() => {
    ran += 1
    end?.()
  })
  end()
  expect(ran).toBe(1)
})

test("an end that throws is left marked as run", () => {
  let ran = 0
  const end = buildEndInFlightOnce(() => {
    ran += 1
    throw new Error("the end threw")
  })
  expect(() => {
    end()
  }).toThrow("the end threw")
  end()
  expect(ran).toBe(1)
})

test("a wrapped end answers nothing", () => {
  const end = buildEndInFlightOnce(() => {})
  expect(end()).toBe(undefined)
})

test("nothing here ends a stream on its own", () => {
  const observer = buildStreamObserver({ account: "one", path: "/v1", startMs: START_MS })
  let ended = 0
  observer.armTerminal(() => {
    ended += 1
  })
  const slot: ObserverSlot = { current: observer }
  expect(slot.current).toBe(observer)
  buildEndInFlightOnce(() => {
    observer.onClientDisconnect?.("gone", END_MS)
  })
  expect(ended).toBe(0)
})

test("a slot takes an observer already terminated", () => {
  const observer = buildStreamObserver({ account: "one", path: "/v1", startMs: START_MS })
  observer.onComplete(END_MS)
  const slot: ObserverSlot = { current: observer }
  let ended = 0
  slot.endInFlight = buildEndInFlightOnce(() => {
    observer.onClientDisconnect?.("gone", END_MS + 5)
    ended += 1
  })
  slot.endInFlight()
  expect(ended).toBe(1)
})
