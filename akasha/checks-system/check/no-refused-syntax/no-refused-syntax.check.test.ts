import { afterAll, expect, test } from "bun:test"
import type { SourceFile } from "typescript"
import { parsedAs } from "../../../code-system/code-source/code-source.module.code.ts"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { type Rule, refusalsIn, rulesIn } from "./no-refused-syntax.check.code.ts"
import type { Standing } from "./syntax-rule/syntax-rule.page-type.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PATH = "akasha/one/probe.module.code.ts"

const TEXT = "export const one = 1\n"

function ruling(slug: string, line: number, reason: string): Rule {
  return { slug, judge: () => [{ line, reason }] }
}

const QUIET: Rule = { slug: "quiet", judge: () => [] }

test("a refusal carries the line, the reason, and the rule that gave it", () => {
  const said = refusalsIn([ruling("loud", 7, "it is wrong")], PATH, TEXT)
  expect(said).toEqual(["line 7: it is wrong — `loud`"])
})

test("a rule refusing nothing refuses nothing", () => {
  expect(refusalsIn([QUIET], PATH, TEXT)).toEqual([])
})

test("two rules refusing one file refuse it twice, and neither hides the other", () => {
  const said = refusalsIn([ruling("one", 1, "first"), ruling("two", 2, "second")], PATH, TEXT)
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
  refusalsIn([watching("one"), watching("two"), watching("three")], PATH, TEXT)
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
  refusalsIn([watching], PATH, TEXT)
  expect(held).toBe(PATH)
})

test("what a rule is handed is a parse of the text it was given", () => {
  const source = parsedAs(PATH, TEXT)
  expect(source.fileName).toBe(PATH)
  expect(source.statements).toHaveLength(1)
})

test("a root where no syntax rule stands is refused, never answered clean", () => {
  const root = scratch.rootFor("akasha-syntax-rule-")
  expect(() => rulesIn(root)).toThrow(/no syntax rule stands/)
})
