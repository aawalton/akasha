import { describe, expect, test } from "bun:test"
import {
  noteServerAction,
  runPaced,
  SERVER_ACTION_BUDGET,
  SERVER_ACTION_HELD_MS,
  serverActionRoom,
  serverActionWaitMs,
} from "akasha/temper/addon/pages/items/modules/inventory-server-action-window/inventory-server-action-window.module.code.ts"

const GAME_ACTION_LIMIT = 100
const GAME_WINDOW_MS = 10000

let clock = 100000
const TIMERS: { at: number; run: () => undefined }[] = []

Reflect.set(globalThis, "GetGameTimeMilliseconds", (): number => clock)
Reflect.set(globalThis, "zo_callLater", (run: () => undefined, ms: number): undefined => {
  TIMERS.push({ at: clock + (ms > 0 ? ms : 1), run })
})

function pump(forMs: number): undefined {
  const until = clock + forMs
  for (;;) {
    TIMERS.sort((a, b) => a.at - b.at)
    const next = TIMERS[0]
    if (next === undefined || next.at > until) {
      clock = until
      return
    }
    TIMERS.shift()
    clock = next.at
    next.run()
  }
}

function quiet(): undefined {
  pump(SERVER_ACTION_HELD_MS * 2)
}

function busiest(sentAt: readonly number[], windowMs: number): number {
  let most = 0
  for (const end of sentAt) {
    const held = sentAt.filter((at) => at <= end && at > end - windowMs).length
    if (held > most) most = held
  }
  return most
}

function sends(count: number, sentAt: number[]): ((this: void) => boolean)[] {
  const steps: ((this: void) => boolean)[] = []
  for (let i = 0; i < count; i++) {
    steps.push((): boolean => {
      sentAt.push(clock)
      return true
    })
  }
  return steps
}

describe("inventory-server-action-window", () => {
  test("the budget is the 100 actions in 10 seconds Alan set", () => {
    expect(SERVER_ACTION_BUDGET).toBe(GAME_ACTION_LIMIT)
    expect(SERVER_ACTION_HELD_MS).toBe(GAME_WINDOW_MS)
  })

  test("room counts down as actions are noted and comes back as they age out", () => {
    quiet()
    expect(serverActionRoom()).toBe(SERVER_ACTION_BUDGET)
    noteServerAction(20)
    expect(serverActionRoom()).toBe(SERVER_ACTION_BUDGET - 20)
    pump(SERVER_ACTION_HELD_MS)
    expect(serverActionRoom()).toBe(SERVER_ACTION_BUDGET)
  })

  test("a paced run sends every step and never more than the budget in ten seconds", () => {
    quiet()
    const sentAt: number[] = []
    let finished = false
    runPaced(
      sends(120, sentAt),
      () => true,
      (done: boolean): undefined => {
        finished = done
      }
    )
    pump(60000)
    expect(finished).toBe(true)
    expect(sentAt.length).toBe(120)
    expect(busiest(sentAt, GAME_WINDOW_MS)).toBe(SERVER_ACTION_BUDGET)
  })

  test("two visits back to back spend one budget between them", () => {
    quiet()
    const sentAt: number[] = []
    const ignore = (): undefined => undefined
    runPaced(sends(60, sentAt), () => true, ignore)
    runPaced(sends(60, sentAt), () => true, ignore)
    pump(60000)
    expect(sentAt.length).toBe(120)
    expect(busiest(sentAt, GAME_WINDOW_MS)).toBeLessThanOrEqual(SERVER_ACTION_BUDGET)
  })

  test("actions noted outside a paced run leave that run less room", () => {
    quiet()
    noteServerAction(SERVER_ACTION_BUDGET - 5)
    const sentAt: number[] = []
    const startedAt = clock
    runPaced(
      sends(10, sentAt),
      () => true,
      (): undefined => undefined
    )
    expect(sentAt.filter((at) => at === startedAt).length).toBe(5)
    pump(60000)
    expect(sentAt.length).toBe(10)
  })

  test("a sender asking room for more than the budget waits only for the whole budget", () => {
    quiet()
    noteServerAction(SERVER_ACTION_BUDGET)
    expect(serverActionWaitMs(SERVER_ACTION_BUDGET + 30)).toBe(SERVER_ACTION_HELD_MS)
  })
})
