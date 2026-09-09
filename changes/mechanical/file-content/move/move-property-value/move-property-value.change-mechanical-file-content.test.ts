import { expect, test } from "bun:test"
import type { Said } from "../../../../modules/answer/change-answer.module.types.ts"
import { bodyOf } from "../../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import {
  type Given,
  movedValue,
  placesOf,
} from "./move-property-value.change-mechanical-file-content.code.ts"

const AT = "akasha/held/kept.module.ts"

const BODY = `import type { Module } from "@akasha/code/module"

export const kept = {
  id: "01a072c8-f35d-7ffc-afc3-75b72460b059",
  pageTypeSlug: "module",
  slug: "kept",
  definition: "what is kept",
  code: "ts",
  partSlugs: ["module/one", "module/two", "module/three"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "the first",
    },
    {
      invariantKind: "gap",
      statement: "the second",
    },
    {
      invariantKind: "gap",
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
  const said = textOn("invariants", 3, 1)

  expect(statementsIn(said)).toEqual(["the third", "the first", "the second"])
})

test("carrying a value away and back leaves the body as it was", () => {
  const there = textOn("invariants", 1, 3)
  const back = movedValue(AT, there, asked("invariants", 3, 1))

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

test("the places are worked out with the value taken out first", () => {
  expect(placesOf(4, 1, 4)).toEqual([1, 2, 3, 0])
  expect(placesOf(4, 4, 1)).toEqual([3, 0, 1, 2])
  expect(placesOf(3, 2, 3)).toEqual([0, 2, 1])
})
