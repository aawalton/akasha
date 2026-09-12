import { afterAll, expect, test } from "bun:test"
import {
  reasonFor,
  refusalsOver,
  sharedIn,
  statementsIn,
} from "akasha/checks/code-checks/pages/invariant-restated-on-a-part-narrows-it/invariant-restated-on-a-part-narrows-it.code-check.decision.code.ts"
import {
  ABOVE_AT,
  aboveText,
  BELOW_AT,
  belowText,
  OTHER,
  rooted,
  SHARED,
  scratch,
} from "akasha/checks/code-checks/pages/invariant-restated-on-a-part-narrows-it/invariant-restated-on-a-part-narrows-it.code-check.decision.test-fixtures.ts"
import { judgingBy, landing } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { bytesOf } from "akasha/testing-system/modules/bodying/bodying.module.code.ts"

afterAll(scratch.sweep)

const judging = judgingBy(refusalsOver)

const SAID = { invariantKind: "departure", statement: SHARED }

test("the statements of a page are read off its invariants", () => {
  expect(statementsIn({ invariants: [SAID] })).toEqual([SHARED])
})

test("a page holding no invariant states nothing", () => {
  expect(statementsIn({ slug: "held" })).toEqual([])
  expect(statementsIn(null)).toEqual([])
})

test("an invariant holding no statement is passed over", () => {
  expect(statementsIn({ invariants: [{ invariantKind: "absence" }, SAID] })).toEqual([SHARED])
})

test("the space around a statement is taken off before it is weighed", () => {
  const padded = { invariantKind: "departure", statement: `  ${SHARED}  ` }
  expect(statementsIn({ invariants: [padded] })).toEqual([SHARED])
})

test("a statement both pages spell alike is what they share", () => {
  expect(sharedIn([SHARED, OTHER], [SHARED])).toEqual([SHARED])
})

test("two pages whose statements merely differ share nothing", () => {
  expect(sharedIn([OTHER], [SHARED])).toEqual([])
})

test("a statement spelled otherwise is no restatement here", () => {
  expect(sharedIn(["A row half written is skipped."], [SHARED])).toEqual([])
})

test("a refusal names the page above and the words both pages state", () => {
  const said = reasonFor(ABOVE_AT, SHARED)
  expect(said).toContain(ABOVE_AT)
  expect(said).toContain(SHARED)
  expect(said).toContain("narrow")
})

test("a part restating the page above word for word is refused", () => {
  const root = rooted([SHARED], [SHARED])
  const said = judging(landing(root, { [BELOW_AT]: bytesOf(belowText([SHARED])) }))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(BELOW_AT)
  expect(said[0]?.reason).toContain(SHARED)
})

test("a part stating something else is let through", () => {
  const root = rooted([OTHER], [SHARED])
  expect(judging(landing(root, { [BELOW_AT]: bytesOf(belowText([SHARED])) }))).toEqual([])
})

test("the page above carrying the change is judged as the part carrying it is", () => {
  const root = rooted([SHARED], [SHARED])
  const said = judging(landing(root, { [ABOVE_AT]: bytesOf(aboveText([SHARED])) }))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(BELOW_AT)
})

test("one restatement earns one refusal where both pages carry the change", () => {
  const root = rooted([SHARED], [SHARED])
  const both = {
    [ABOVE_AT]: bytesOf(aboveText([SHARED])),
    [BELOW_AT]: bytesOf(belowText([SHARED])),
  }
  expect(judging(landing(root, both))).toHaveLength(1)
})

test("a page the change takes away is passed over", () => {
  const root = rooted([SHARED], [SHARED])
  expect(judging(landing(root, { [BELOW_AT]: null }))).toEqual([])
})
