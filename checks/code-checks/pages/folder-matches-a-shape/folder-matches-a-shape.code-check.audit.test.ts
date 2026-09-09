import { expect, test } from "bun:test"
import { everyFolderIn } from "./folder-matches-a-shape.code-check.audit.code.ts"
import { grouping } from "./folder-matches-a-shape.code-check.test-fixtures.ts"

test("an audit reaches the workspace root and every folder under it", () => {
  const grouped = grouping({
    "": ["akasha"],
    akasha: ["akasha/one", "akasha/two"],
    "akasha/one": ["akasha/one/deep"],
  })
  expect([...everyFolderIn(grouped)].sort()).toEqual([
    "",
    "akasha",
    "akasha/one",
    "akasha/one/deep",
    "akasha/two",
  ])
})

test("a tree with no folder under the root is the workspace root alone", () => {
  expect(everyFolderIn(grouping({}))).toEqual([""])
})
