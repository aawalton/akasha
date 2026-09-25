import { expect, test } from "bun:test"
import { roundOf } from "akasha/check/modules/model-running/model-running.module.code.ts"

test("a statement answered yes is refused and one answered otherwise is asked again", () => {
  expect(roundOf([4, 7], ["YES, it breaks the rule", "NO"])).toEqual({
    yes: [4],
    again: [7],
    heard: [4, 7],
  })
})

test("a statement whose prompt reached no model is asked again and counted unheard", () => {
  expect(roundOf([4, 7], [null, "YES"])).toEqual({ yes: [7], again: [4], heard: [7] })
})

test("an answer missing from the job is a prompt that reached no model", () => {
  expect(roundOf([4, 7], ["NO"])).toEqual({ yes: [], again: [4, 7], heard: [4] })
})
