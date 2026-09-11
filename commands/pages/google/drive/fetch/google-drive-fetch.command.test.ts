import { expect, test } from "bun:test"
import { refusingWith } from "akasha/commands/modules/calling/calling.module.test-fixtures.ts"
import {
  folderOf,
  readIn,
} from "akasha/commands/pages/google/drive/fetch/google-drive-fetch.command.code.ts"

const refusedBy = refusingWith(readIn)

test("a call naming no file is refused", () => {
  expect(refusedBy([])[0]).toContain("none was named")
})

test("a flag it does not take is refused", () => {
  expect(refusedBy(["abc", "--depth", "2"])[0]).toContain("--depth")
})

test("a flag with no value after it is refused", () => {
  expect(refusedBy(["--source"])[0]).toContain("takes a value")
})

test("the file is read from the word said in place", () => {
  const read = readIn(["1AbC"])
  if ("refused" in read) throw new Error("this was refused")
  expect(read.said.get("--source")).toBe("1AbC")
})

test("a file named in place and as a flag is refused", () => {
  expect(refusedBy(["1AbC", "--source", "1AbC"])[0]).toContain("in place")
})

test("a second file is refused", () => {
  expect(refusedBy(["1AbC", "2DeF"])[0]).toContain("one file")
})

test("a folder named as a relative path is read against the repository root", () => {
  expect(folderOf("album", "/repo", "/called/from")).toBe("/repo/album")
})

test("a folder named as an absolute path is taken as it is", () => {
  expect(folderOf("/pictures/in", "/repo", "/called/from")).toBe("/pictures/in")
})

test("naming no folder writes into the folder the call came from", () => {
  expect(folderOf(undefined, "/repo", "/called/from")).toBe("/called/from")
})
