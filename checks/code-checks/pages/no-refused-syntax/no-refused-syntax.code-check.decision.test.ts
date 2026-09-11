import { afterAll, expect, test } from "bun:test"
import {
  type Rule,
  readersOf,
  refusalsIn,
  rulesIn,
} from "akasha/checks/code-checks/pages/no-refused-syntax/no-refused-syntax.code-check.decision.code.ts"
import {
  BEFORE,
  CARRIED,
  changing,
  modulesFiled,
  NO_READERS,
  nowhereOnDisk,
  PROBE_AT,
  PROBE_SLUG,
  QUIET,
  RULE,
  ruled,
  ruleFiled,
  ruling,
  scratch,
  TEXT,
  UNPARSED,
} from "akasha/checks/code-checks/pages/no-refused-syntax/no-refused-syntax.code-check.decision.test-fixtures.ts"
import type { Given } from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { parsedAs } from "akasha/code/code-source/code-source.module.code.ts"
import { noneOfTypeFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"
import type { SourceFile } from "typescript"

afterAll(scratch.sweep)

test("a refusal carries the line, the reason, and the rule that gave it", () => {
  const said = refusalsIn([ruling("loud", 7, "it is wrong")], PROBE_AT, TEXT, NO_READERS)
  expect(said).toEqual(["line 7: it is wrong — `loud`"])
})

test("a rule refusing nothing refuses nothing", () => {
  expect(refusalsIn([QUIET], PROBE_AT, TEXT, NO_READERS)).toEqual([])
})

test("two rules refusing one file refuse it twice, and neither hides the other", () => {
  const said = refusalsIn(
    [ruling("one", 1, "first"), ruling("two", 2, "second")],
    PROBE_AT,
    TEXT,
    NO_READERS
  )
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
  refusalsIn([watching("one"), watching("two"), watching("three")], PROBE_AT, TEXT, NO_READERS)
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
  refusalsIn([watching], PROBE_AT, TEXT, NO_READERS)
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
  expect(refusalsIn(rules, PROBE_AT, TEXT, NO_READERS)).toEqual([
    "line 1: the body the change carries — `probe`",
  ])
})

test("a change rewriting a rule's code is judged by the body the change carries", () => {
  const root = scratch.rootFor("akasha-syntax-rule-")
  ruleFiled(root)
  const rules = rulesIn(root, nowhereOnDisk(root), changing(root, BEFORE, CARRIED))
  expect(rules).toHaveLength(1)
  expect(refusalsIn(rules, PROBE_AT, TEXT, NO_READERS)).toEqual([
    "line 1: the body the change carries — `probe`",
  ])
})

test("the readers of page bodies are the names the module pages declare and no others", () => {
  const root = scratch.rootFor("akasha-syntax-rule-")
  modulesFiled(root)
  const found = readersOf(shadowAt(root))

  expect([...found.keys()].sort()).toEqual(["accountValuesIn", "valueAt"])
  expect([...(found.get("valueAt") ?? [])]).toEqual(["page-value"])
  expect([...(found.get("accountValuesIn") ?? [])]).toEqual(["claude-account-reading"])
  expect(found.has("quiet")).toBe(false)
})

test("a rule whose code no change answers a body for is refused", () => {
  const root = scratch.rootFor("akasha-syntax-rule-")
  ruleFiled(root)
  expect(() => rulesIn(root, nowhereOnDisk(root))).toThrow(/holding no body/)
})

test("a rule the tree no longer holds is judged by the body the change answers for", () => {
  const root = scratch.rootFor("akasha-syntax-rule-")
  ruleFiled(root)
  const rules = rulesIn(root, shadowAt(root), changing(root, CARRIED, CARRIED))
  expect(rules).toHaveLength(1)
  expect(refusalsIn(rules, PROBE_AT, TEXT, NO_READERS)).toEqual([
    "line 1: the body the change carries — `probe`",
  ])
})

test("a rule the tree holds another body at is judged by the body the change answers for", () => {
  const root = ruled("akasha-syntax-rule-")
  const rules = rulesIn(root, shadowAt(root), changing(root, CARRIED, CARRIED))
  expect(refusalsIn(rules, PROBE_AT, TEXT, NO_READERS)).toEqual([
    "line 1: the body the change carries — `probe`",
  ])
})

test("a rule whose code does not parse refuses the run rather than being run as recovered", () => {
  const root = ruled("akasha-syntax-rule-")
  expect(() => rulesIn(root, shadowAt(root), changing(root, CARRIED, UNPARSED))).toThrow(
    /does not parse/
  )
})
