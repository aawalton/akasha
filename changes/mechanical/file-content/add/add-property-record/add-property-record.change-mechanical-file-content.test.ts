import { expect, test } from "bun:test"
import {
  bodyOf,
  refusalOf,
  worldOf,
} from "../../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import {
  addPropertyRecord,
  recordIn,
  runChange,
} from "./add-property-record.change-mechanical-file-content.code.ts"

const AT = "held/one.page-type.ts"

const KEY = "properties"

const SLUG = `{ pagePropertySlug: "text-property/slug", required: true, many: false }`

const NAME = `{ pagePropertySlug: "text-property/name", required: false, many: false }`

function bodied(held: string): string {
  return `export const one = {
  slug: "one",
${held}
} as const satisfies PageType
`
}

const HOLDING = bodied(`  properties: [
    ${SLUG},
  ],`)

function answering(held: string, record = NAME) {
  const world = worldOf({ [AT]: held })
  return { world, said: addPropertyRecord(world, { at: AT, key: KEY, record }) }
}

test("a record is put in as the body spells it rather than as a quoted string", () => {
  const { world, said } = answering(HOLDING)
  const left = bodyOf(said, world.base)
  expect(left).toContain(NAME)
  expect(left).not.toContain(JSON.stringify(NAME))
})

test("a record is put after the records the property already holds", () => {
  const { world, said } = answering(HOLDING)
  const left = bodyOf(said, world.base)
  expect(left.indexOf(NAME)).toBeGreaterThan(left.indexOf(SLUG))
})

test("a record takes the indent the record above it carries", () => {
  const { world, said } = answering(HOLDING)
  expect(bodyOf(said, world.base)).toContain(`    ${SLUG},\n    ${NAME},`)
})

test("text that parses as no record is refused before the body is read", () => {
  const said = addPropertyRecord(worldOf({}), { at: AT, key: KEY, record: "[1, 2]" })
  expect(refusalOf(said)).toContain("parses as no record")
})

test("a record trailing anything beyond itself parses as no record", () => {
  expect(recordIn(`${NAME} and more`)).toBe(null)
})

test("the whitespace around a record is dropped before that record is read", () => {
  const { world, said } = answering(HOLDING, `\n      ${NAME}\n    `)
  expect(bodyOf(said, world.base)).toContain(`    ${SLUG},\n    ${NAME},`)
})

test("a record the property spells already is refused however it is spaced", () => {
  const { said } = answering(HOLDING, `\n  ${SLUG}\n`)
  expect(refusalOf(said)).toContain("already")
})

test("a property holding one value is refused rather than made a list", () => {
  const { said } = answering(bodied(`  properties: "text",`))
  expect(refusalOf(said)).toContain("holds one value")
})

test("a record the property spells already is refused rather than held twice", () => {
  const { said } = answering(HOLDING, SLUG)
  expect(refusalOf(said)).toContain("already")
})

test("a page stating no such key gains that key rather than being refused", () => {
  const { world, said } = answering(bodied(`  definition: "one",`))
  expect(bodyOf(said, world.base)).toContain(`${KEY}: [${NAME}]`)
})

test("a body exporting no object is refused rather than gaining a key", () => {
  const said = addPropertyRecord(worldOf({ [AT]: "const one = 1\n" }), {
    at: AT,
    key: KEY,
    record: NAME,
  })
  expect(refusalOf(said)).toContain("exports no object")
})

test("the change is reached through its own runner", () => {
  const world = worldOf({ [AT]: HOLDING })
  expect(bodyOf(runChange(world, { at: AT, key: KEY, record: NAME }), world.base)).toContain(NAME)
})
