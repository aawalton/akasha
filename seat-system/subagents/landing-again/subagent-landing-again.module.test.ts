import { expect, test } from "bun:test"
import { PUT_BACK } from "akasha/commands/modules/change-freshness/change-freshness.module.code.ts"
import { heldSaid, WAITED_AT_MOST } from "akasha/git/holding/holding.module.code.ts"
import {
  landingAgain,
  reasonThrown,
  THROWN,
  TRIES,
  WAIT_MS,
  type Went,
  worthAnotherTry,
} from "akasha/seat-system/subagents/landing-again/subagent-landing-again.module.code.ts"

const GOING: Went = { went: true }

const LOCKED: Went = { why: heldSaid(WAITED_AT_MOST) }

const MOVED: Went = {
  why: `one.subagent.ts — read against \`abc\`, and what is at \`def\` is not what was read, ${PUT_BACK}`,
}

const REFUSED: Went = { why: "no assignment is stated for the akasha seat" }

const WROTE = "a.subagent.ts is in commit abc123"

const UNFOUND = new Error(
  "Cannot find module 'akasha/one/one.module.code.ts' from 'akasha/two/two.module.code.ts'"
)

const THREW_LOCK = new Error(heldSaid(WAITED_AT_MOST))

function whyIn(went: Went): string {
  return "why" in went ? went.why : ""
}

function counting(answers: readonly (Went | Error)[]): {
  readonly ask: () => Promise<Went>
  readonly waited: (ms: number) => Promise<void>
  readonly waits: number[]
  readonly count: () => number
} {
  let asked = 0
  const waits: number[] = []
  return {
    ask: () => {
      asked += 1
      const held = answers[Math.min(asked - 1, answers.length - 1)] ?? GOING
      return held instanceof Error ? Promise.reject(held) : Promise.resolve(held)
    },
    waited: (ms: number) => {
      waits.push(ms)
      return Promise.resolve()
    },
    waits,
    count: () => asked,
  }
}

test("a landing refused for a held lock is asked for again until that landing goes", async () => {
  const run = counting([LOCKED, LOCKED, GOING])
  expect(await landingAgain(run.ask, [], run.waited)).toEqual(GOING)
  expect(run.count()).toBe(3)
  expect(run.waits).toEqual([WAIT_MS, WAIT_MS])
})

test("a landing refused for a held lock every time is asked for five times and no more", async () => {
  const run = counting([LOCKED])
  expect(await landingAgain(run.ask, [], run.waited)).toEqual(LOCKED)
  expect(run.count()).toBe(TRIES)
})

test("a landing refused because the tree moved under it is asked for again", async () => {
  const run = counting([MOVED, GOING])
  expect(await landingAgain(run.ask, [], run.waited)).toEqual(GOING)
  expect(run.count()).toBe(2)
})

test("a refusal naming no held lock is answered at once and waits for nothing", async () => {
  const run = counting([REFUSED])
  expect(await landingAgain(run.ask, [], run.waited)).toEqual(REFUSED)
  expect(run.count()).toBe(1)
  expect(run.waits).toEqual([])
})

test("a landing that ends in an error answers that error as a reason of its own", async () => {
  const run = counting([UNFOUND])
  expect(whyIn(await landingAgain(run.ask, [], run.waited))).toBe(reasonThrown(UNFOUND))
})

test("a landing that ends in an error names what the run had done before that error", async () => {
  const run = counting([UNFOUND])
  const why = whyIn(await landingAgain(run.ask, [WROTE], run.waited))
  expect(why).toContain(reasonThrown(UNFOUND))
  expect(why).toContain(WROTE)
})

test("a refusal the landing worded is answered as worded, with nothing added to it", async () => {
  const run = counting([REFUSED])
  expect(await landingAgain(run.ask, [WROTE], run.waited)).toEqual(REFUSED)
})

test("a landing that could not find a module is answered at once", async () => {
  const run = counting([UNFOUND])
  await landingAgain(run.ask, [], run.waited)
  expect(run.count()).toBe(1)
  expect(run.waits).toEqual([])
})

test("a landing whose error names a held lock is asked for again", async () => {
  const run = counting([THREW_LOCK, GOING])
  expect(await landingAgain(run.ask, [], run.waited)).toEqual(GOING)
  expect(run.count()).toBe(2)
})

test("a reason another try in this run would meet no differently is answered at once", () => {
  expect(worthAnotherTry(whyIn(LOCKED))).toBe(true)
  expect(worthAnotherTry(whyIn(MOVED))).toBe(true)
  expect(worthAnotherTry(whyIn(REFUSED))).toBe(false)
  expect(worthAnotherTry(reasonThrown(UNFOUND))).toBe(false)
})

test("a landing ending in what is no error says what that was", () => {
  expect(reasonThrown("the tree went")).toBe(`${THROWN}: the tree went`)
})
