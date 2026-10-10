import { describe, expect, test } from "bun:test"
import { trailingCall } from "akasha/temper/addon/pages/items/modules/inventory-trailing-call/inventory-trailing-call.module.code.ts"

interface Timer {
  readonly at: number
  readonly run: () => undefined
}

function fakeClock(): {
  schedule: (run: () => undefined, delayMs: number) => number
  cancel: (handle: number) => void
  advance: (ms: number) => void
} {
  let now = 0
  let next = 1
  const timers = new Map<number, Timer>()
  return {
    schedule: (run, delayMs) => {
      const handle = next
      next += 1
      timers.set(handle, { at: now + delayMs, run })
      return handle
    },
    cancel: (handle) => {
      timers.delete(handle)
    },
    advance: (ms) => {
      now += ms
      for (const [handle, timer] of [...timers]) {
        if (timer.at > now) continue
        timers.delete(handle)
        timer.run()
      }
    },
  }
}

describe("inventory-trailing-call", () => {
  test("a burst of calls runs once, a delay after the last call", () => {
    const clock = fakeClock()
    let runs = 0
    const call = trailingCall(clock.schedule, clock.cancel, 250, () => {
      runs += 1
      return undefined
    })
    call()
    clock.advance(200)
    call()
    clock.advance(200)
    call()
    clock.advance(200)
    expect(runs).toBe(0)
    clock.advance(50)
    expect(runs).toBe(1)
  })

  test("a call after the run is a run of its own", () => {
    const clock = fakeClock()
    let runs = 0
    const call = trailingCall(clock.schedule, clock.cancel, 250, () => {
      runs += 1
      return undefined
    })
    call()
    clock.advance(250)
    call()
    clock.advance(250)
    expect(runs).toBe(2)
  })
})
