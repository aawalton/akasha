import { expect, test } from "bun:test"
import type { Given } from "../../command-system/calling/calling.module.code.ts"
import { drive, folderOf, readIn } from "./drive.command.code.ts"

function given(): Given {
  return {
    root: "/nowhere",
    calledAs: "akasha drive",
    from: "/called/from",
    writer: null,
    agentId: null,
  }
}

function refusedBy(argv: readonly string[]): readonly string[] {
  const read = readIn(argv)
  if (!("refused" in read)) throw new Error(`${argv.join(" ")} was read rather than refused`)
  return read.refused
}

test("nothing said is refused, naming the acts", async () => {
  const said = await drive([], given())
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("fetch")
  expect(said.refusals[0]).toContain("auth")
})

test("an act it does not carry is refused", () => {
  expect(refusedBy(["upload"])[0]).toContain("upload")
})

test("the consent named with no act is refused", () => {
  expect(refusedBy(["auth"])[0]).toContain("login")
})

test("a fetch naming no file is refused", () => {
  expect(refusedBy(["fetch"])[0]).toContain("none was named")
})

test("a flag it does not take is refused", () => {
  expect(refusedBy(["fetch", "abc", "--depth", "2"])[0]).toContain("--depth")
})

test("a flag another act takes is refused under this one", () => {
  expect(refusedBy(["auth", "login", "--out", "/var/tmp"])[0]).toContain("--out")
})

test("a flag with no value after it is refused", () => {
  expect(refusedBy(["fetch", "--source"])[0]).toContain("takes a value")
})

test("the file is read from the word standing after the act", () => {
  const read = readIn(["fetch", "1AbC"])
  if ("refused" in read) throw new Error("this was refused")
  expect(read.said.get("--source")).toBe("1AbC")
})

test("a file named in place and as a flag is refused", () => {
  expect(refusedBy(["fetch", "1AbC", "--source", "1AbC"])[0]).toContain("in place")
})

test("a second file is refused", () => {
  expect(refusedBy(["fetch", "1AbC", "2DeF"])[0]).toContain("one file")
})

test("a word standing after the consent act is refused", () => {
  expect(refusedBy(["auth", "login", "extra"])[0]).toContain("names nothing in place")
})

test("a folder named as a relative path is read against the repository root", () => {
  expect(folderOf("album", "/repo", "/called/from")).toBe("/repo/album")
})

test("a folder named as an absolute path stands as it is", () => {
  expect(folderOf("/pictures/in", "/repo", "/called/from")).toBe("/pictures/in")
})

test("naming no folder writes into the folder the call came from", () => {
  expect(folderOf(undefined, "/repo", "/called/from")).toBe("/called/from")
})
