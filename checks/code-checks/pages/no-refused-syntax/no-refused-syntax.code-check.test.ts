import { afterAll, expect, test } from "bun:test"
import { parsedAs } from "@akasha/code-system/code-source"
import { scratchWorld } from "@akasha/command-system/scratching"
import { listedFiled, noneOfTypeFiled } from "@akasha/indexes/testing"
import type { Change } from "@akasha/pages-system/change"
import { type Shadow, shadowAt } from "@akasha/pages-system/shadow"
import type { SourceFile } from "typescript"
import { type Rule, refusalsIn, rulesIn } from "./no-refused-syntax.code-check.code.ts"
import { PROBE_AT } from "./no-refused-syntax.code-check.test-fixtures.ts"
import type { Standing } from "./syntax-rules/syntax-rule.page-type.ts"

const RULE = "syntax-rule"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const TEXT = "export const one = 1\n"

const PROBE_SLUG = "probe"

const PROBE_ID = "01a0596b-0000-7000-8000-000000000001"

const PROBE_RULE_AT = "akasha/one/probe/probe.syntax-rule.ts"

const PROBE_CODE_AT = "akasha/one/probe/probe.syntax-rule.code.ts"

const CARRIED =
  'export function probe() {\n  return [{ line: 1, reason: "the body the change carries" }]\n}\n'

const BEFORE =
  'export function probe() {\n  return [{ line: 9, reason: "the body that stood" }]\n}\n'

function bytesOf(text: string | null): Uint8Array | null {
  return text === null ? null : new TextEncoder().encode(text)
}

function changing(root: string, before: string | null, after: string | null): Change {
  return {
    root,
    changed: [PROBE_CODE_AT],
    before: (path) => (path === PROBE_CODE_AT ? bytesOf(before) : null),
    after: (path) => (path === PROBE_CODE_AT ? bytesOf(after) : null),
  }
}

function ruleFiled(root: string): undefined {
  listedFiled(root, RULE, PROBE_SLUG, [{ path: PROBE_RULE_AT, id: PROBE_ID }])
  return undefined
}

function nowhereOnDisk(root: string): Shadow {
  const shadow = shadowAt(root)
  return { ...shadow, codeAt: () => null }
}

function ruling(slug: string, line: number, reason: string): Rule {
  return { slug, judge: () => [{ line, reason }] }
}

const QUIET: Rule = { slug: "quiet", judge: () => [] }

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
    judge: (standing: Standing) => {
      seen.push(standing.source)
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
    judge: (standing: Standing) => {
      held = standing.path
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

test("a root where no syntax rule stands is refused, never answered clean", () => {
  const root = scratch.rootFor("akasha-syntax-rule-")
  noneOfTypeFiled(root, RULE)
  expect(() => rulesIn(root, shadowAt(root))).toThrow(/no syntax rule stands/)
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

test("a change rewriting a rule's code is refused rather than judged by the body before it", () => {
  const root = scratch.rootFor("akasha-syntax-rule-")
  ruleFiled(root)
  expect(() => rulesIn(root, nowhereOnDisk(root), changing(root, BEFORE, CARRIED))).toThrow(
    /body no path on disk holds/
  )
})

test("a rule whose code the change carries nowhere is refused as a rewrite is", () => {
  const root = scratch.rootFor("akasha-syntax-rule-")
  ruleFiled(root)
  expect(() => rulesIn(root, nowhereOnDisk(root))).toThrow(/body no path on disk holds/)
})
