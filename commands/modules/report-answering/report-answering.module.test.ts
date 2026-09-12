import { expect, test } from "bun:test"
import { OK, OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { reportedBy } from "akasha/commands/modules/report-answering/report-answering.module.code.ts"

test("the lines gathered are the report, with nothing refused", () => {
  const said = reportedBy(() => ["one", "two"])

  expect(said.code).toBe(OK)
  expect(said.report).toEqual(["one", "two"])
  expect(said.refusals).toEqual([])
})

test("a thrown reason comes back as a refusal carrying that reason", () => {
  const said = reportedBy(() => {
    throw new Error("nothing was there")
  })

  expect(said.code).toBe(OPERATIONAL)
  expect(said.refusals.join(" ")).toContain("nothing was there")
})

test("gathering nothing answers an empty report rather than refusing", () => {
  const said = reportedBy(() => [])

  expect(said.code).toBe(OK)
  expect(said.report).toEqual([])
})
