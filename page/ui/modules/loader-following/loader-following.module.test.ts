import { expect, test } from "bun:test"
import {
  type Later,
  paceRevalidation,
} from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"

type Waiting = { readonly due: number; readonly then: () => undefined; live: boolean }

function fakeClock() {
  let at = 0
  const waiting: Waiting[] = []
  const later: Later = (ms, then) => {
    const one: Waiting = { due: at + ms, then, live: true }
    waiting.push(one)
    return () => {
      one.live = false
      return undefined
    }
  }
  const advance = (ms: number): undefined => {
    const end = at + ms
    for (;;) {
      const next = waiting
        .filter((one) => one.live && one.due <= end)
        .sort((a, b) => a.due - b.due)[0]
      if (next === undefined) break
      at = next.due
      next.live = false
      next.then()
    }
    at = end
    return undefined
  }
  return { now: () => at, later, advance }
}

function rig() {
  const clock = fakeClock()
  const ends: (() => void)[] = []
  let runs = 0
  const pacing = paceRevalidation({
    run: () => {
      runs += 1
      return new Promise<void>((done) => ends.push(done))
    },
    later: clock.later,
    now: clock.now,
  })
  const finish = async (): Promise<void> => {
    ends.shift()?.()
    await new Promise((done) => setTimeout(done, 0))
  }
  return { clock, pacing, runs: () => runs, finish }
}

test("a burst of changes runs the loaders once, a second after the last", async () => {
  const { clock, pacing, runs, finish } = rig()
  for (let i = 0; i < 5; i += 1) {
    pacing.told()
    clock.advance(100)
  }
  clock.advance(899)
  expect(runs()).toBe(0)
  clock.advance(1)
  expect(runs()).toBe(1)
  await finish()
  clock.advance(10_000)
  expect(runs()).toBe(1)
})

test("changes told during a run owe exactly one run more, a second after it", async () => {
  const { clock, pacing, runs, finish } = rig()
  pacing.told()
  clock.advance(1_000)
  expect(runs()).toBe(1)
  pacing.told()
  pacing.told()
  pacing.told()
  clock.advance(5_000)
  expect(runs()).toBe(1)
  await finish()
  clock.advance(999)
  expect(runs()).toBe(1)
  clock.advance(1)
  expect(runs()).toBe(2)
  await finish()
  clock.advance(10_000)
  expect(runs()).toBe(2)
})

test("a quiet stretch runs nothing", () => {
  const { clock, runs } = rig()
  clock.advance(60_000)
  expect(runs()).toBe(0)
})

test("a change every half second still runs the loaders every three seconds", async () => {
  const { clock, pacing, runs, finish } = rig()
  for (let i = 0; i < 21; i += 1) {
    clock.advance(500)
    pacing.told()
    await finish()
  }
  expect(runs()).toBe(3)
})

test("a pacing stopped runs nothing it was told of", () => {
  const { clock, pacing, runs } = rig()
  pacing.told()
  pacing.stop()
  pacing.told()
  clock.advance(10_000)
  expect(runs()).toBe(0)
})
