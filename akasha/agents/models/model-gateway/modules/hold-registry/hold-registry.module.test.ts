import { expect, test } from "bun:test"
import { buildHoldRegistry, type HoldHandle } from "./hold-registry.module.code.ts"

const START_MS = 1_000

test("entering a hold hands back the handle exiting that hold needs", () => {
  const registry = buildHoldRegistry()
  const handle: HoldHandle = registry.enter(START_MS)
  expect(handle.startMs).toBe(START_MS)
  expect(registry.snapshot(START_MS).heldCount).toBe(1)
  registry.exit(handle)
  expect(registry.snapshot(START_MS).heldCount).toBe(0)
})

test("a snapshot counts the holds entered and not yet exited", () => {
  const registry = buildHoldRegistry()
  const first = registry.enter(START_MS)
  registry.enter(START_MS + 10)
  registry.enter(START_MS + 20)
  expect(registry.snapshot(START_MS + 30).heldCount).toBe(3)
  registry.exit(first)
  expect(registry.snapshot(START_MS + 30).heldCount).toBe(2)
})

test("two holds entered at the same millisecond are two holds", () => {
  const registry = buildHoldRegistry()
  const first = registry.enter(START_MS)
  const second = registry.enter(START_MS)
  expect(registry.snapshot(START_MS).heldCount).toBe(2)
  registry.exit(first)
  expect(registry.snapshot(START_MS).heldCount).toBe(1)
  registry.exit(second)
  expect(registry.snapshot(START_MS).heldCount).toBe(0)
})

test("exiting a handle already exited changes nothing", () => {
  const registry = buildHoldRegistry()
  const handle = registry.enter(START_MS)
  const other = registry.enter(START_MS + 5)
  registry.exit(handle)
  registry.exit(handle)
  expect(registry.snapshot(START_MS).heldCount).toBe(1)
  expect(registry.snapshot(START_MS + 5).oldestHeldMs).toBe(0)
  registry.exit(other)
})

test("exiting a handle the registry never entered changes nothing", () => {
  const registry = buildHoldRegistry()
  registry.enter(START_MS)
  const stranger: HoldHandle = { startMs: START_MS }
  registry.exit(stranger)
  expect(registry.snapshot(START_MS).heldCount).toBe(1)
})

test("a snapshot of an empty registry reports the oldest age as null rather than zero", () => {
  const registry = buildHoldRegistry()
  expect(registry.snapshot(START_MS)).toEqual({ heldCount: 0, oldestHeldMs: null })
  const handle = registry.enter(START_MS)
  registry.exit(handle)
  expect(registry.snapshot(START_MS + 500)).toEqual({ heldCount: 0, oldestHeldMs: null })
})

test("a snapshot ages the oldest hold from the earliest start still held", () => {
  const registry = buildHoldRegistry()
  const oldest = registry.enter(START_MS)
  registry.enter(START_MS + 400)
  expect(registry.snapshot(START_MS + 700).oldestHeldMs).toBe(700)
  registry.exit(oldest)
  expect(registry.snapshot(START_MS + 700).oldestHeldMs).toBe(300)
})

test("the oldest hold is found whatever order the holds were entered in", () => {
  const later = buildHoldRegistry()
  later.enter(START_MS + 300)
  later.enter(START_MS)
  expect(later.snapshot(START_MS + 300).oldestHeldMs).toBe(300)

  const earlier = buildHoldRegistry()
  earlier.enter(START_MS)
  earlier.enter(START_MS + 300)
  expect(earlier.snapshot(START_MS + 300).oldestHeldMs).toBe(300)
})

test("an age is never below zero", () => {
  const registry = buildHoldRegistry()
  registry.enter(START_MS)
  expect(registry.snapshot(START_MS - 900).oldestHeldMs).toBe(0)
})

test("a hold never exited is held for the life of the process", () => {
  const registry = buildHoldRegistry()
  registry.enter(START_MS)
  for (let turn = 1; turn <= 5; turn += 1) {
    const snapshot = registry.snapshot(START_MS + turn * 1_000)
    expect(snapshot.heldCount).toBe(1)
    expect(snapshot.oldestHeldMs).toBe(turn * 1_000)
  }
})

test("whoever enters a hold exits the hold on every path the request can end by", () => {
  const registry = buildHoldRegistry()
  const handle = registry.enter(START_MS)
  expect(() => {
    try {
      throw new Error("the request ended by throwing")
    } finally {
      registry.exit(handle)
    }
  }).toThrow("the request ended by throwing")
  expect(registry.snapshot(START_MS).heldCount).toBe(0)
})

test("nothing here reads a clock", () => {
  const registry = buildHoldRegistry()
  registry.enter(START_MS)
  const first = registry.snapshot(START_MS + 250)
  const second = registry.snapshot(START_MS + 250)
  expect(first).toEqual(second)
  expect(first.oldestHeldMs).toBe(250)
})

test("nothing here knows what a hold is waiting on", () => {
  const registry = buildHoldRegistry()
  const handle = registry.enter(START_MS)
  expect(Object.keys(handle)).toEqual(["startMs"])
  expect(Object.keys(registry.snapshot(START_MS))).toEqual(["heldCount", "oldestHeldMs"])
})
