import { afterAll, expect, test } from "bun:test"
import { parsedAs } from "@akasha/code/code-source"
import { noneOfTypeFiled } from "@akasha/indexes/testing"
import { shadowAt } from "@akasha/pages/shadow"
import type { SourceFile } from "typescript"
import { type Rule, refusalsIn, rulesIn } from "./no-refused-syntax.code-check.decision.code.ts"
import {
  BEFORE,
  CARRIED,
  changing,
  nowhereOnDisk,
  PROBE_SLUG,
  QUIET,
  RULE,
  ruleFiled,
  ruling,
  scratch,
  TEXT,
} from "./no-refused-syntax.code-check.decision.test-fixtures.ts"
import { PROBE_AT } from "./no-refused-syntax.code-check.test-fixtures.ts"
import type { Given } from "./syntax-rules/syntax-rule.page-type.ts"

afterAll(scratch.sweep)

test("a refusal carries the line, the reason, and the rule that gave it", () => {
  const said = refusalsIn([ruling("loud", 7, "it is wrong")], PROBE_AT, TEXT)
  expect(said).toEqual(["line 7: it is wrong — `loud`"])
})

test("a rule refusing nothing refuses nothing", () => {
  expect(refusalsIn([QUIET], PROBE_AT, TEXT)).toEqual([])
})

test("two rules refusing one file refuse it twice, and neither hides the other", () => {
  const said = refusalsIn([ruling("one", 1, "first"), ruling("two", 2, "second")], PROBE_AT, TEXT)
  expect(said).toHaveLength(2)
  expect(said[0]).toContain("`one`")
  expect(said[1]).toContain("`two`")
})

test("every rule is handed the very same parse, so a file is read the once", () => {
  const seen: SourceFile[] = []
  const watching = (slug: string): Rule => ({
    slug,
    judge: (given: Given) => {
      seen.push(given.source)
      return []
    },
  })
  refusalsIn([watching("one"), watching("two"), watching("three")], PROBE_AT, TEXT)
  expect(seen).toHaveLength(3)
  expect(seen[0]).toBe(seen[1] as SourceFile)
  expect(seen[1]).toBe(seen[2] as SourceFile)
})

test("a rule is handed the path of the file it judges", () => {
  let held = ""
  const watching: Rule = {
    slug: "watching",
    judge: (given: Given) => {
      held = given.path
      return []
    },
  }
  refusalsIn([watching], PROBE_AT, TEXT)
  expect(held).toBe(PROBE_AT)
})

test("what a rule is handed is a parse of the text it was given", () => {
  const source = parsedAs(PROBE_AT, TEXT)
  expect(source.fileName).toBe(PROBE_AT)
  expect(source.statements).toHaveLength(1)
})

test("a root holding no syntax rule is refused, never answered clean", () => {
  const root = scratch.rootFor("akasha-syntax-rule-")
  noneOfTypeFiled(root, RULE)
  expect(() => rulesIn(root, shadowAt(root))).toThrow(/no syntax rule/)
})

test("a rule this change introduces is judged by the body the change carries", () => {
  const root = scratch.rootFor("akasha-syntax-rule-")
  ruleFiled(root)
  const rules = rulesIn(root, nowhereOnDisk(root), changing(root, null, CARRIED))
  expect(rules).toHaveLength(1)
  expect(rules[0]?.slug).toBe(PROBE_SLUG)
  expect(refusalsIn(rules, PROBE_AT, TEXT)).toEqual([
    "line 1: the body the change carries — `probe`",
  ])
})

test("a change rewriting a rule's code is judged by the body the change carries", () => {
  const root = scratch.rootFor("akasha-syntax-rule-")
  ruleFiled(root)
  const rules = rulesIn(root, nowhereOnDisk(root), changing(root, BEFORE, CARRIED))
  expect(rules).toHaveLength(1)
  expect(refusalsIn(rules, PROBE_AT, TEXT)).toEqual([
    "line 1: the body the change carries — `probe`",
  ])
})

test("a rule whose code no change carries and no disk holds is refused", () => {
  const root = scratch.rootFor("akasha-syntax-rule-")
  ruleFiled(root)
  expect(() => rulesIn(root, nowhereOnDisk(root))).toThrow(/body no path on disk holds/)
})
