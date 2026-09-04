import { expect, test } from "bun:test"
import type { Given } from "../../command-system/calling/calling.module.code.ts"
import { folderOf, icloud, readIn } from "./icloud.command.code.ts"

const ALBUM = "https://share.icloud.com/photos/0ABCdef"

function given(): Given {
  return {
    root: "/nowhere",
    calledAs: "akasha icloud",
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

test("nothing said is refused, naming the act", async () => {
  const said = await icloud([], given())
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("fetch")
})

test("an act it does not carry is refused", () => {
  expect(refusedBy(["push"])[0]).toContain("push")
})

test("a fetch naming no album is refused", () => {
  expect(refusedBy(["fetch"])[0]).toContain("none was named")
})

test("a flag it does not take is refused", () => {
  expect(refusedBy(["fetch", ALBUM, "--since", "2026"])[0]).toContain("--since")
})

test("a flag with no value after it is refused", () => {
  expect(refusedBy(["fetch", "--url"])[0]).toContain("takes a value")
})

test("the album is read from the word standing after the act", () => {
  const read = readIn(["fetch", ALBUM])
  if ("refused" in read) throw new Error("this was refused")
  expect(read.said.get("--url")).toBe(ALBUM)
})

test("an album named in place and as a flag is refused", () => {
  expect(refusedBy(["fetch", ALBUM, "--url", ALBUM])[0]).toContain("in place")
})

test("a second album is refused", () => {
  expect(refusedBy(["fetch", ALBUM, ALBUM])[0]).toContain("one album")
})

test("the older spelling of the folder flag is read as the folder flag", () => {
  const read = readIn(["fetch", ALBUM, "--output", "/pictures"])
  if ("refused" in read) throw new Error("this was refused")
  expect(read.said.get("--out")).toBe("/pictures")
})

test("the folder flag said under both spellings is refused", () => {
  expect(refusedBy(["fetch", ALBUM, "--out", "/a", "--output", "/b"])[0]).toContain("twice")
})

test("the json flag stands alone and takes no value", () => {
  const read = readIn(["fetch", ALBUM, "--json"])
  if ("refused" in read) throw new Error("this was refused")
  expect(read.json).toBe(true)
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
