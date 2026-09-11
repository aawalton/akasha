import { expect, test } from "bun:test"
import { answeredBy } from "akasha/commands/modules/report-answering/report-answering.module.code.ts"

test("the lines gathered are the report, with nothing refused", () => {
  const said = answeredBy(() => ["one", "two"])

  expect(said.code).toBe(0)
  expect(said.report).toEqual(["one", "two"])
  expect(said.refusals).toEqual([])
})

test("a thrown reason comes back as a refusal carrying that reason", () => {
  const said = answeredBy(() => {
    throw new Error("nothing was there")
  })

  expect(said.code).toBe(3)
  expect(said.refusals.join(" ")).toContain("nothing was there")
})

test("gathering nothing answers an empty report rather than refusing", () => {
  const said = answeredBy(() => [])

  expect(said.code).toBe(0)
  expect(said.report).toEqual([])
})
