import { expect, test } from "bun:test"
import {
  changeProsePattern,
  passagesAt,
  spelt,
} from "akasha/change/mechanical/prose/change-prose-pattern/change-prose-pattern.change-mechanical.code.ts"
import {
  BODIES,
  ONE,
  ONE_AT,
  PATTERNS,
  parsing,
  SPELLINGS,
  TWO,
  TWO_AT,
  VALUES,
  worldFor,
} from "akasha/change/mechanical/prose/change-prose-pattern/change-prose-pattern.change-mechanical.test-fixtures.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import { bodyAnswered } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ASKED = { spellings: SPELLINGS, patterns: PATTERNS }

function worldOf(
  bodies: Readonly<Record<string, string>> = BODIES,
  values: ReadonlyMap<string, Value> = VALUES,
  seen: string[] = []
): World {
  return worldFor(bodies, values, listing(seen))
}

test("every passage a banned term is written in is restated in this one answer", async () => {
  const world = worldOf()

  const said = await changeProsePattern(world, ASKED, parsing)

  expect(bodyAnswered(said, world, ONE_AT)).toContain(`saying: "a page has a value",`)
  expect(bodyAnswered(said, world, ONE_AT)).toContain(`statement: "a page has one",`)
  expect(bodyAnswered(said, world, TWO_AT)).toContain(`saying: "a page has a value",`)
})

test("two passages in one body are answered by one edit", async () => {
  const world = worldOf()

  const said = await changeProsePattern(world, ASKED, parsing)

  const held = said.edits.filter((one) => one.kind === "replace" && one.path === ONE_AT)

  expect(held).toHaveLength(1)
  expect(said.edits).toHaveLength(2)
})

test("no rung beneath is reached", async () => {
  const seen: string[] = []
  const world = worldOf(BODIES, VALUES, seen)

  const said = await changeProsePattern(world, ASKED, parsing)

  expect(said.refused).toBeNull()
  expect(seen).toEqual([])
})

test("a count handed in holds how many passages one run restates", async () => {
  const world = worldOf()

  const said = await changeProsePattern(world, { ...ASKED, count: 1 }, parsing)

  expect([...new Set(pathsIn(said))]).toEqual([ONE_AT])
  expect(bodyAnswered(said, world, ONE_AT)).toContain(`statement: "a page holds one",`)
})

test("one passage refused refuses the whole, and the refusal names that page", async () => {
  const world = worldOf({ ...BODIES, [ONE_AT]: "const one = 1\n" })

  const said = await changeProsePattern(world, ASKED, parsing)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(ONE_AT)
})

test("a run stating no pair is refused", async () => {
  const said = await changeProsePattern(worldOf(), { spellings: SPELLINGS, patterns: [] }, parsing)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no pair is handed in, so nothing says what is written instead")
})

test("a run stating no spelling is refused", async () => {
  const said = await changeProsePattern(worldOf(), { spellings: [], patterns: PATTERNS }, parsing)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no spelling is handed in, so no passage is found")
})

test("a repository stating the term nowhere is refused by the plainest spelling", async () => {
  const said = await changeProsePattern(
    worldOf(BODIES, new Map([[TWO_AT, { ...TWO, saying: "a page has a value" }]])),
    ASKED,
    parsing
  )

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no passage states `hold` in a frame a pair names")
})

test("a spelling is found as a word rather than inside one", () => {
  const spellings = new Set(["hold"])

  expect(spelt("a page hold a value", spellings)).toBe(true)
  expect(spelt("a threshold is read", spellings)).toBe(false)
})

test("a prose value states one passage under its own key", () => {
  expect(passagesAt(ONE, ONE_AT, { key: "saying", under: [] })).toEqual([
    { path: ONE_AT, key: "saying", under: [], text: "a page holds a value" },
  ])
})

test("a prose field of a record states one passage for each record", () => {
  const value: Value = { notes: [{ statement: "a page holds one" }, { statement: "and two" }] }

  const said = passagesAt(value, ONE_AT, { key: "notes", under: ["statement"] })

  expect(said.map((one) => one.text)).toEqual(["a page holds one", "and two"])
})

test("a prose value stating many strings states no passage", () => {
  const value: Value = { notes: [{ aids: ["a page holds one", "a page holds two"] }] }

  expect(passagesAt(value, ONE_AT, { key: "notes", under: ["aids"] })).toEqual([])
})

test("a prose value under more than one record states no passage", () => {
  const value: Value = { notes: [{ under: { statement: "a page holds one" } }] }

  expect(passagesAt(value, ONE_AT, { key: "notes", under: ["under", "statement"] })).toEqual([])
})
