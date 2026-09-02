import { expect, test } from "bun:test"
import {
  buildInFlightTracker,
  type IdleReading,
  type IdleWaitTimers,
} from "./in-flight.module.code.ts"

type HeldTimers = {
  readonly timers: IdleWaitTimers
  readonly armed: () => readonly number[]
  readonly stopped: () => number
  readonly fire: () => undefined
}

function heldTimers(): HeldTimers {
  const armed: number[] = []
  let pending: (() => undefined)[] = []
  let stops = 0
  return {
    timers: {
      waited: (ms, fired) => {
        armed.push(ms)
        pending.push(fired)
        return (): undefined => {
          stops += 1
        }
      },
    },
    armed: () => armed,
    stopped: () => stops,
    fire: (): undefined => {
      const held = pending
      pending = []
      for (const one of held) one()
    },
  }
}

function firingTimers(): HeldTimers {
  let stops = 0
  const armed: number[] = []
  return {
    timers: {
      waited: (ms, fired) => {
        armed.push(ms)
        fired()
        return (): undefined => {
          stops += 1
        }
      },
    },
    armed: () => armed,
    stopped: () => stops,
    fire: (): undefined => undefined,
  }
}

function settledWith(reading: IdleReading): boolean {
  return reading.idle
}

test("a fresh tracker counts nothing", () => {
  expect(buildInFlightTracker(heldTimers().timers).getCount()).toBe(0)
})

test("beginning a request raises the count", () => {
  const tracker = buildInFlightTracker(heldTimers().timers)
  tracker.begin()
  expect(tracker.getCount()).toBe(1)
  tracker.begin()
  expect(tracker.getCount()).toBe(2)
})

test("ending a request lowers the count", () => {
  const tracker = buildInFlightTracker(heldTimers().timers)
  tracker.begin()
  tracker.begin()
  tracker.end()
  expect(tracker.getCount()).toBe(1)
})

test("an end met while the count is zero leaves the count at zero", () => {
  const tracker = buildInFlightTracker(heldTimers().timers)
  tracker.end()
  expect(tracker.getCount()).toBe(0)
})

test("a count never falls below zero", () => {
  const tracker = buildInFlightTracker(heldTimers().timers)
  tracker.begin()
  for (let each = 0; each < 5; each += 1) tracker.end()
  expect(tracker.getCount()).toBe(0)
  tracker.begin()
  expect(tracker.getCount()).toBe(1)
})

test("an idle wait asked for while the count is zero reports the tracker idle", async () => {
  const tracker = buildInFlightTracker(heldTimers().timers)
  expect(settledWith(await tracker.whenIdle(1000))).toBe(true)
})

test("an idle wait asked for while the count is zero arms no timer", async () => {
  const held = heldTimers()
  const tracker = buildInFlightTracker(held.timers)
  await tracker.whenIdle(1000)
  expect(held.armed()).toEqual([])
})

test("an idle wait resolves on the end that brings the count to zero", async () => {
  const held = heldTimers()
  const tracker = buildInFlightTracker(held.timers)
  tracker.begin()
  const waiting = tracker.whenIdle(1000)
  tracker.end()
  expect(settledWith(await waiting)).toBe(true)
})

test("an idle wait outlives an end that leaves the count above zero", async () => {
  const held = heldTimers()
  const tracker = buildInFlightTracker(held.timers)
  tracker.begin()
  tracker.begin()
  let done = false
  const waiting = tracker.whenIdle(1000).then((reading): IdleReading => {
    done = true
    return reading
  })
  tracker.end()
  await Promise.resolve()
  expect(done).toBe(false)
  tracker.end()
  expect(settledWith(await waiting)).toBe(true)
})

test("every idle wait a tracker holds resolves on that same end", async () => {
  const held = heldTimers()
  const tracker = buildInFlightTracker(held.timers)
  tracker.begin()
  const every = [tracker.whenIdle(1000), tracker.whenIdle(2000), tracker.whenIdle(3000)]
  tracker.end()
  const readings = await Promise.all(every)
  expect(readings.map(settledWith)).toEqual([true, true, true])
})

test("an idle wait outliving its span reports the tracker busy", async () => {
  const held = heldTimers()
  const tracker = buildInFlightTracker(held.timers)
  tracker.begin()
  const waiting = tracker.whenIdle(1000)
  held.fire()
  expect(settledWith(await waiting)).toBe(false)
  expect(tracker.getCount()).toBe(1)
})

test("the span asked for is the span the timer is armed with", async () => {
  const held = heldTimers()
  const tracker = buildInFlightTracker(held.timers)
  tracker.begin()
  const waiting = tracker.whenIdle(4321)
  expect(held.armed()).toEqual([4321])
  tracker.end()
  await waiting
})

test("an idle wait asked for twice arms a timer for each wait", async () => {
  const held = heldTimers()
  const tracker = buildInFlightTracker(held.timers)
  tracker.begin()
  const every = [tracker.whenIdle(10), tracker.whenIdle(20)]
  expect(held.armed()).toEqual([10, 20])
  tracker.end()
  await Promise.all(every)
})

test("an idle wait resolved by its span is not resolved again by an end", async () => {
  const held = heldTimers()
  const tracker = buildInFlightTracker(held.timers)
  tracker.begin()
  const waiting = tracker.whenIdle(1000)
  held.fire()
  tracker.end()
  expect(settledWith(await waiting)).toBe(false)
})

test("an idle wait resolved by an end is not resolved again by its span", async () => {
  const held = heldTimers()
  const tracker = buildInFlightTracker(held.timers)
  tracker.begin()
  const waiting = tracker.whenIdle(1000)
  tracker.end()
  held.fire()
  expect(settledWith(await waiting)).toBe(true)
})

test("a resolved idle wait stops the timer that wait armed", async () => {
  const held = heldTimers()
  const tracker = buildInFlightTracker(held.timers)
  tracker.begin()
  const waiting = tracker.whenIdle(1000)
  expect(held.stopped()).toBe(0)
  tracker.end()
  await waiting
  expect(held.stopped()).toBe(1)
})

test("a resolved idle wait is taken out of the waiting a tracker holds", async () => {
  const held = heldTimers()
  const tracker = buildInFlightTracker(held.timers)
  tracker.begin()
  const waiting = tracker.whenIdle(1000)
  held.fire()
  await waiting
  tracker.end()
  tracker.begin()
  tracker.end()
  expect(held.stopped()).toBe(1)
})

test("a timer firing while it is being armed is stopped once the arming returns", async () => {
  const held = firingTimers()
  const tracker = buildInFlightTracker(held.timers)
  tracker.begin()
  const reading = await tracker.whenIdle(1000)
  expect(settledWith(reading)).toBe(false)
  expect(held.stopped()).toBe(1)
})

test("a request begun after an idle wait resolved leaves that wait resolved", async () => {
  const held = heldTimers()
  const tracker = buildInFlightTracker(held.timers)
  tracker.begin()
  const waiting = tracker.whenIdle(1000)
  tracker.end()
  expect(settledWith(await waiting)).toBe(true)
  tracker.begin()
  expect(tracker.getCount()).toBe(1)
})

test("an end met while the count is zero resolves no idle wait", async () => {
  const held = heldTimers()
  const tracker = buildInFlightTracker(held.timers)
  tracker.end()
  tracker.begin()
  let done = false
  const waiting = tracker.whenIdle(1000).then((reading): IdleReading => {
    done = true
    return reading
  })
  await Promise.resolve()
  expect(done).toBe(false)
  tracker.end()
  await waiting
  expect(done).toBe(true)
})

test("a tracker built with no timers answers an idle count at once", async () => {
  const tracker = buildInFlightTracker()
  expect(settledWith(await tracker.whenIdle(0))).toBe(true)
})

test("two trackers count apart from each other", () => {
  const held = heldTimers()
  const one = buildInFlightTracker(held.timers)
  const other = buildInFlightTracker(held.timers)
  one.begin()
  one.begin()
  other.begin()
  expect(one.getCount()).toBe(2)
  expect(other.getCount()).toBe(1)
})

test("the count is answered while a wait is pending", async () => {
  const held = heldTimers()
  const tracker = buildInFlightTracker(held.timers)
  tracker.begin()
  tracker.begin()
  const waiting = tracker.whenIdle(1000)
  expect(tracker.getCount()).toBe(2)
  tracker.end()
  tracker.end()
  await waiting
  expect(tracker.getCount()).toBe(0)
})
