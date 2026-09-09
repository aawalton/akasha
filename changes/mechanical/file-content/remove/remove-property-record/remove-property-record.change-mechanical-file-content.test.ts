import { expect, test } from "bun:test"
import {
  bodyOf,
  refusalOf,
  worldOf,
} from "../../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import {
  recordGone,
  runChange,
} from "./remove-property-record.change-mechanical-file-content.code.ts"

const AT = "held/one.page-type.ts"

const KEY = "invariants"

const FIRST = `{ invariantKind: "departure", statement: "the first" }`

const SECOND = `{ invariantKind: "gap", statement: "the second" }`

function bodied(held: string): string {
  return `export const one = {
  slug: "one",
${held}
} as const satisfies PageType
`
}

const HOLDING = bodied(`  invariants: [
    ${FIRST},
    ${SECOND},
  ],`)

function answering(held: string, where = "statement", is = "the first") {
  const world = worldOf({ [AT]: held })
  return { world, said: runChange(world, { at: AT, key: KEY, where, is }) }
}

test("the record a match names is taken out", () => {
  const { world, said } = answering(HOLDING)
  const left = bodyOf(said, world.base)

  expect(left).not.toContain(FIRST)
  expect(left).toContain(SECOND)
})

test("a record is named by any field of its own", () => {
  const { world, said } = answering(HOLDING, "invariantKind", "gap")
  const left = bodyOf(said, world.base)

  expect(left).toContain(FIRST)
  expect(left).not.toContain(SECOND)
})

test("a property keeps its key when the last record goes", () => {
  const one = bodied(`  invariants: [
    ${FIRST},
  ],`)
  const { world, said } = answering(one)

  expect(bodyOf(said, world.base)).toContain("invariants: [")
})

test("a key holding no record is refused", () => {
  const { said } = answering(bodied(`  partSlugs: ["one/two"],`))

  expect(refusalOf(said)).toContain("states no records under `invariants`")
})

test("a key holding a list of no records is refused", () => {
  const { said } = answering(bodied(`  invariants: ["one"],`))

  expect(refusalOf(said)).toContain("states no records under `invariants`")
})

test("text no record states is refused", () => {
  const { said } = answering(HOLDING, "statement", "the third")

  expect(refusalOf(said)).toBe("no record under `invariants` states that text under `statement`")
})

test("text more than one record states is refused, and the refusal says how many", () => {
  const two = bodied(`  invariants: [
    ${FIRST},
    ${FIRST},
  ],`)
  const { said } = answering(two)

  expect(refusalOf(said)).toBe(
    "2 records under `invariants` state that text under `statement`, and one change works one"
  )
})

test("a body holding nothing at that path is refused", () => {
  const said = runChange(worldOf({}), { at: AT, key: KEY, where: "statement", is: "the first" })

  expect(refusalOf(said)).toContain("could not be read")
})

test("the passage answered is the lines the record is taken out of", () => {
  const { said } = answering(HOLDING)

  expect(said.edits.length).toBe(1)
  expect(said.edits[0]).toMatchObject({ kind: "replace", path: AT })
})

test("the record is read from the body handed in", () => {
  const said = recordGone(AT, HOLDING, { at: AT, key: KEY, where: "statement", is: "the second" })

  expect(said.refused).toBeNull()
})
