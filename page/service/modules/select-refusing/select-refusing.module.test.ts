import { afterAll, expect, test } from "bun:test"
import { scratch } from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import {
  bodyIn,
  refusalIn,
  squadOf,
} from "akasha/page/service/modules/page-composing/page-composing.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("a value a select property states is written", () => {
  const said = squadOf({ squadPart: "tank", squadParts: ["tank", "healer"], rank: "high" })
  expect(refusalIn(said)).toBe("")
  expect(bodyIn(said)).toContain('squadPart: "tank"')
})

test("a value outside a select property's set is refused, naming the property and the value", () => {
  const said = refusalIn(squadOf({ squadPart: "dps" }))
  expect(said).toContain("`squadPart` is `select-property/squad-part`")
  expect(said).toContain('"dps"')
  expect(said).toContain("`tank`, `healer`")
})

test("a list under a select property is refused for the one value outside its set", () => {
  const said = refusalIn(squadOf({ squadParts: ["tank", "dps"] }))
  expect(said).toContain("`squadParts` is `select-property/squad-parts`")
  expect(said).toContain('"dps"')
})

test("a select property stating no values is judged by the set its page type states", () => {
  expect(refusalIn(squadOf({ rank: "high" }))).toBe("")
  expect(refusalIn(squadOf({ rank: "middling" }))).toContain('"middling"')
})

test("a select property handed nothing is no refusal", () => {
  expect(refusalIn(squadOf({ squadPart: null, squadParts: [] }))).toBe("")
})
