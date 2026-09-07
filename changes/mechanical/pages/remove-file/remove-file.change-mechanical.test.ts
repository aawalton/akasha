import { expect, test } from "bun:test"
import { reading } from "@akasha/pages/page-value/testing"
import { removeFile } from "./remove-file.change-mechanical.code.ts"

const AT = "akasha/one.held.ts"

test("a path the tree holds a body for is answered as one edit taking that path away", () => {
  const said = removeFile({ at: AT }, reading({ [AT]: "alpha\n" }))

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ path: AT, was: "alpha\n", body: null }])
})

test("a path holding no body is refused and answers no edit", () => {
  const said = removeFile({ at: AT }, reading({}))

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/holds no body/)
})
