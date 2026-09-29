import { expect, test } from "bun:test"
import {
  type Given,
  movedValue,
  placesOf,
  runChange,
} from "akasha/change/mechanical/file-content/move/move-property-value/move-property-value.change-mechanical-file-content.code.ts"
import type { Said } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  bodyOf,
  knownOf,
  worldFor,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const AT = "akasha/held/kept.module.ts"

const BODY = `import type { Module } from "@akasha/code/module"

export const kept = {
  id: "01a072c8-f35d-7ffc-afc3-75b72460b059",
  type: "page-type/module",
  slug: "kept",
  definition: "what is kept",
  code: "ts",
  partSlugs: ["module/one", "module/two", "module/three"],
  decisions: [
    {
      decisionKind: "departure",
      statement: "the first",
    },
    {
      decisionKind: "gap",
      statement: "the second",
    },
    {
      decisionKind: "gap",
      statement: "the third",
    },
  ],
} as const satisfies Module
`

function asked(key: string, from: number, to: number): Given {
  return { at: AT, key, from, to }
}

function ranOn(key: string, from: number, to: number): Said {
  return movedValue(AT, BODY, asked(key, from, to))
}

function textOn(key: string, from: number, to: number): string {
  return bodyOf(ranOn(key, from, to), (path) => (path === AT ? BODY : null))
}

function statementsIn(said: string): readonly string[] {
  return [...said.matchAll(/statement: "(.+)"/g)].map((one) => one[1] ?? "")
}

test("a value carried down sits at the place named", () => {
  const said = textOn("partSlugs", 1, 3)

  expect(said).toContain(`["module/two", "module/three", "module/one"]`)
})

test("a value carried up pushes the values it passed down one place", () => {
  const said = textOn("partSlugs", 3, 1)

  expect(said).toContain(`["module/three", "module/one", "module/two"]`)
})

test("the rest of the body is left as it is", () => {
  const said = textOn("partSlugs", 1, 2)

  expect(said).toBe(BODY.replace(`"module/one", "module/two"`, `"module/two", "module/one"`))
})

test("a record is carried as a value is", () => {
  const said = textOn("decisions", 3, 1)

  expect(statementsIn(said)).toEqual(["the third", "the first", "the second"])
})

test("carrying a value away and back leaves the body as it was", () => {
  const there = textOn("decisions", 1, 3)
  const back = movedValue(AT, there, asked("decisions", 3, 1))

  expect(bodyOf(back, (path) => (path === AT ? there : null))).toBe(BODY)
})

test("a key the page states nothing under is refused", () => {
  const said = ranOn("directives", 1, 2)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` states no \`directives\``)
})

test("a key holding one value is refused", () => {
  const said = ranOn("slug", 1, 2)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`slug` holds one value, so that value has nowhere to go")
})

test("a place no value sits at is refused", () => {
  const said = ranOn("partSlugs", 4, 1)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`partSlugs` holds 3 values, and place 4 is none of them")
})

test("the place moved onto is judged the same way", () => {
  const said = ranOn("partSlugs", 1, 0)

  expect(said.refused).toBe("`partSlugs` holds 3 values, and place 0 is none of them")
})

test("a place that is no whole number is refused", () => {
  const said = ranOn("partSlugs", 1.5, 2)

  expect(said.refused).toBe("`partSlugs` holds 3 values, and place 1.5 is none of them")
})

test("a move onto the place the value sits at already is refused", () => {
  const said = ranOn("partSlugs", 2, 2)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("place 2 of `partSlugs` is where that value sits already")
})

test("a body exporting no object is refused", () => {
  const said = movedValue(AT, "const held = 1\n", asked("partSlugs", 1, 2))

  expect(said.refused).toBe(`\`${AT}\` exports no object`)
})

function statedOn(where: string, is: string, to: number): Said {
  return movedValue(AT, BODY, { at: AT, key: "decisions", where, is, to })
}

test("a record named by a field is carried to the place named", () => {
  const said = statedOn("statement", "the third", 1)

  expect(statementsIn(bodyOf(said, (path) => (path === AT ? BODY : null)))).toEqual([
    "the third",
    "the first",
    "the second",
  ])
})

test("a record named by a field is found in the body rather than counted outside it", () => {
  const said = statedOn("statement", "the first", 3)

  expect(statementsIn(bodyOf(said, (path) => (path === AT ? BODY : null)))).toEqual([
    "the second",
    "the third",
    "the first",
  ])
})

test("text no record states under that field is refused", () => {
  const said = statedOn("statement", "the fourth", 1)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no record under `decisions` states that text under `statement`")
})

test("text more than one record states under that field is refused", () => {
  const said = statedOn("decisionKind", "gap", 1)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "2 records under `decisions` state that text under `decisionKind`, and one change works one"
  )
})

test("a record named by a field already at the place named is refused", () => {
  const said = statedOn("statement", "the first", 1)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("place 1 of `decisions` is where that value sits already")
})

function ontoOf(is: string, onto: string): Said {
  return movedValue(AT, BODY, { at: AT, key: "decisions", where: "statement", is, onto })
}

function orderOf(said: Said): readonly string[] {
  return statementsIn(bodyOf(said, (path) => (path === AT ? BODY : null)))
}

test("a record moved onto one above it sits before that value", () => {
  expect(orderOf(ontoOf("the third", "the first"))).toEqual([
    "the third",
    "the first",
    "the second",
  ])
})

test("a record moved onto one below it sits after that value", () => {
  expect(orderOf(ontoOf("the first", "the third"))).toEqual([
    "the second",
    "the third",
    "the first",
  ])
})

test("a record moved onto its neighbour swaps with it", () => {
  expect(orderOf(ontoOf("the first", "the second"))).toEqual([
    "the second",
    "the first",
    "the third",
  ])
})

test("a move onto a value the body no longer holds is refused", () => {
  const said = ontoOf("the first", "the fourth")

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no record under `decisions` states that text under `statement`")
})

test("a move onto itself is refused", () => {
  const said = ontoOf("the first", "the first")

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("place 1 of `decisions` is where that value sits already")
})

test("the places are worked out with the value taken out first", () => {
  expect(placesOf(4, 1, 4)).toEqual([1, 2, 3, 0])
  expect(placesOf(4, 4, 1)).toEqual([3, 0, 1, 2])
  expect(placesOf(3, 2, 3)).toEqual([0, 2, 1])
})

const PAGE = {
  id: "01a072c8-f35d-7ffc-afc3-75b72460b059",
  type: `${pageType.slug}/module`,
  slug: "kept",
} as Value

const LONGER = BODY.replace(
  `"module/one", "module/two", "module/three"`,
  `"a value far longer than twenty characters"`
)

const NAMED = "The values are: 1 module/one, 2 module/two, 3 module/three"

function worldOn(kind: string): World {
  const page = { ...PAGE, type: `${pageType.slug}/${kind}` } as Value
  return {
    ...worldFor(page, BODY, running),
    index: {
      knownIn: () => knownOf({ admitting: (one) => [one] }),
      pageByPath: () => page,
      valuesByPath: () => new Map<string, Value>(),
      kindsUnder: (one: string) => new Set([one]),
    } as never,
  }
}

test("a place no value sits at is refused with the values named where the caller asks for them", () => {
  const said = movedValue(AT, BODY, asked("partSlugs", 4, 1), true)

  expect(said.refused).toBe(`\`partSlugs\` holds 3 values, and place 4 is none of them. ${NAMED}`)
})

test("a value named is shortened to its first twenty characters", () => {
  const said = movedValue(AT, LONGER, asked("partSlugs", 2, 1), true)

  expect(said.refused).toBe(
    "`partSlugs` holds one value, and place 2 is none of them. The values are: 1 a value far longer t…"
  )
})

test("the values are named where the caller asks and the page holds no lore", () => {
  const said = runChange(worldOn("module"), asked("partSlugs", 4, 1))

  expect(said.refused).toBe(`\`partSlugs\` holds 3 values, and place 4 is none of them. ${NAMED}`)
})

test("no value is named where the page holds lore", () => {
  const said = runChange(worldOn("lore"), asked("partSlugs", 4, 1))

  expect(said.refused).toBe("`partSlugs` holds 3 values, and place 4 is none of them")
})

test("no value is named where the page's type cannot be read", () => {
  const world = { ...worldFor(PAGE, BODY, running), index: { pageByPath: () => null } as never }

  expect(runChange(world, asked("partSlugs", 4, 1)).refused).toBe(
    "`partSlugs` holds 3 values, and place 4 is none of them"
  )
})
