import { expect, test } from "bun:test"
import {
  changeProsePattern,
  patternsIn,
  runChange,
  spellingsIn,
} from "akasha/change/agent/prose/change-prose-pattern/change-prose-pattern.change-agent.code.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { changeProsePattern as changeProsePatternMechanical } from "akasha/change/mechanical/prose/change-prose-pattern/change-prose-pattern.change-mechanical.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  type Caught,
  catching,
  refusalOf,
  worldOf,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

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

function worldNaming(term: Value | null, seen: Caught[]): World {
  return { ...worldOf({}), index: { pageAt: () => term } as never, reaching: catching(seen) }
}

test("a term naming no banned term is refused", async () => {
  const said = await changeProsePattern(worldNaming(null, []), { term: "hold-inside" })

  expect(refusalOf(said)).toBe("`hold-inside` names no banned term")
})

test("a term naming no pair is refused", async () => {
  const said = await changeProsePattern(worldNaming({ slug: "hold-inside" }, []), {
    term: "hold-inside",
  })

  expect(refusalOf(said)).toBe(
    "`hold-inside` names no pair, so nothing says what is written instead"
  )
})

test("working the restatements out is left to the change reached at its address", async () => {
  const seen: Caught[] = []

  await changeProsePattern(worldNaming(TERM, seen), { term: "hold-inside" })

  expect(seen.map((one) => one.at)).toEqual([
    `${changeMechanical.slug}/${changeProsePatternMechanical.slug}`,
  ])
  expect(seen[0]?.given).toEqual({ spellings: [...spellingsIn(TERM)], patterns: patternsIn(TERM) })
})

test("a count says how many passages are restated, and that count is handed down", async () => {
  const seen: Caught[] = []

  await changeProsePattern(worldNaming(TERM, seen), { term: "hold-inside", count: 2 })

  expect(seen[0]?.given).toEqual({
    spellings: [...spellingsIn(TERM)],
    patterns: patternsIn(TERM),
    count: 2,
  })
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
