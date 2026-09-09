import { expect, test } from "bun:test"
import type { Value } from "@akasha/pages/page-value"
import { refusalOf, worldOf } from "../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import {
  passagesAt,
  patternsIn,
  runChange,
  spellingsIn,
  spelt,
} from "./change-prose-pattern.change-agent.code.ts"

const TERM: Value = {
  slug: "hold-inside",
  spelling: "hold",
  variants: ["holds", "holding", "held"],
  replacementPatterns: [
    { frame: "object", fromPattern: "holds [object]", toPattern: "has [object]" },
    { frame: "fronted", fromPattern: "holds", toPattern: "has" },
  ],
}

test("the pairs are read off the banned term", () => {
  expect(patternsIn(TERM)).toEqual([
    { frame: "object", fromPattern: "holds [object]", toPattern: "has [object]" },
    { frame: "fronted", fromPattern: "holds", toPattern: "has" },
  ])
})

test("a term stating no pair is read as no pairs", () => {
  expect(patternsIn({ slug: "one" })).toEqual([])
})

test("the spellings are the plainest one and every variant", () => {
  expect([...spellingsIn(TERM)].sort()).toEqual(["held", "hold", "holding", "holds"])
})

test("a spelling is found as a word rather than inside one", () => {
  const spellings = new Set(["hold"])
  expect(spelt("a page hold a value", spellings)).toBe(true)
  expect(spelt("a threshold is read", spellings)).toBe(false)
})

test("a prose value states one passage under its own key", () => {
  const value: Value = { definition: "a page holds a value" }
  expect(passagesAt(value, "one.ts", { key: "definition", under: [] })).toEqual([
    { path: "one.ts", key: "definition", under: [], text: "a page holds a value" },
  ])
})

test("a prose field of a record states one passage for each record", () => {
  const value: Value = {
    invariants: [{ statement: "a page holds one" }, { statement: "a page holds two" }],
  }
  const said = passagesAt(value, "one.ts", { key: "invariants", under: ["statement"] })
  expect(said.map((one) => one.text)).toEqual(["a page holds one", "a page holds two"])
})

test("a prose value stating many strings states no passage", () => {
  const value: Value = { directives: [{ aids: ["a page holds one", "a page holds two"] }] }
  expect(passagesAt(value, "one.ts", { key: "directives", under: ["aids"] })).toEqual([])
})

test("a prose value under more than one record states no passage", () => {
  const value: Value = { held: [{ under: { statement: "a page holds one" } }] }
  expect(passagesAt(value, "one.ts", { key: "held", under: ["under", "statement"] })).toEqual([])
})

test("a call naming no term is refused by the key naming that argument", async () => {
  const said = await runChange(worldOf({}), {})
  expect(refusalOf(said)).toContain("`term`")
})

test("a count that is no whole number is refused before anything is parsed", async () => {
  const said = await runChange(worldOf({}), { term: "hold-inside", count: "some" })
  expect(refusalOf(said)).toContain("no whole number")
})

test("a count of nothing is refused before anything is parsed", async () => {
  const said = await runChange(worldOf({}), { term: "hold-inside", count: "-1" })
  expect(refusalOf(said)).toContain("no whole number")
})
