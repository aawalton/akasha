import { expect, test } from "bun:test"
import { mistaking, troubling } from "akasha/commands/modules/refusing/refusing.module.code.ts"

const NOTHING = "nothing was judged and nothing was written"

test("a refusal answers with the reasons given and reports nothing", () => {
  expect(mistaking(["one", "two"])).toEqual({ report: [], refusals: ["one", "two"], code: 1 })
})

test("nothing mistaken and nothing wrong is no refusal at all", () => {
  expect(troubling({ mistaken: [], wrong: [] })).toBe(null)
})

test("a call with anything mistaken is refused as a fault of the call", () => {
  expect(troubling({ mistaken: ["said wrong"], wrong: ["is wrong"] })).toEqual({
    report: [],
    refusals: ["said wrong", "is wrong", NOTHING],
    code: 1,
  })
})

test("a call wrong with nothing mistaken is refused as a fault of the data", () => {
  expect(troubling({ mistaken: [], wrong: ["is wrong"] })).toEqual({
    report: [],
    refusals: ["is wrong", NOTHING],
    code: 2,
  })
})
