import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refusingWith } from "akasha/commands/modules/calling/calling.module.test-fixtures.ts"
import {
  folderOf,
  icloudFetch,
  readIn,
} from "akasha/commands/pages/icloud/fetch/icloud-fetch.command.code.ts"

const ALBUM = "https://share.icloud.com/photos/0ABCdef"

function given(): Given {
  return {
    root: "/nowhere",
    calledAs: "akasha icloud fetch",
    from: "/called/from",
    writer: null,
    agentId: null,
  }
}

const refusedBy = refusingWith(readIn)

test("nothing said is refused, saying an album is needed", async () => {
  const said = await icloudFetch([], given())

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("none was named")
})

test("a flag it does not take is refused", () => {
  expect(refusedBy([ALBUM, "--since", "2026"])[0]).toContain("--since")
})

test("a flag with no value after it is refused", () => {
  expect(refusedBy(["--url"])[0]).toContain("takes a value")
})

test("the album is read from the word said in place", () => {
  const read = readIn([ALBUM])

  if ("refused" in read) throw new Error("this was refused")
  expect(read.said.get("--url")).toBe(ALBUM)
})

test("an album named in place and as a flag is refused", () => {
  expect(refusedBy([ALBUM, "--url", ALBUM])[0]).toContain("in place")
})

test("a second album is refused", () => {
  expect(refusedBy([ALBUM, ALBUM])[0]).toContain("one album")
})

test("the older spelling of the folder flag is read as the folder flag", () => {
  const read = readIn([ALBUM, "--output", "/pictures"])

  if ("refused" in read) throw new Error("this was refused")
  expect(read.said.get("--out")).toBe("/pictures")
})

test("the folder flag said under both spellings is refused", () => {
  expect(refusedBy([ALBUM, "--out", "/a", "--output", "/b"])[0]).toContain("twice")
})

test("the json flag is alone and takes no value", () => {
  const read = readIn([ALBUM, "--json"])

  if ("refused" in read) throw new Error("this was refused")
  expect(read.json).toBe(true)
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
