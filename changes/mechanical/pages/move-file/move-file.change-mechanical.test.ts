import { expect, test } from "bun:test"
import { reading } from "@akasha/pages/page-value/testing"
import { moveFile } from "./move-file.change-mechanical.code.ts"

const FROM = "akasha/one.held.ts"

const TO = "akasha/two.held.ts"

test("a path the tree holds a body for is answered as one edit carrying it to another path", () => {
  const said = moveFile({ from: FROM, to: TO }, reading({ [FROM]: "alpha\n" }))

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ path: TO, was: "alpha\n", body: "alpha\n", from: FROM }])
})

test("a path holding no body is refused and answers no edit", () => {
  const said = moveFile({ from: FROM, to: TO }, reading({}))

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/holds no body/)
})

test("a path a body already stands at is refused rather than written over", () => {
  const said = moveFile({ from: FROM, to: TO }, reading({ [FROM]: "alpha\n", [TO]: "beta\n" }))

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/is a body already/)
})

test("the path a file already sits at is refused rather than answered as a move", () => {
  const said = moveFile({ from: FROM, to: FROM }, reading({ [FROM]: "alpha\n" }))

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/already sits at/)
})
