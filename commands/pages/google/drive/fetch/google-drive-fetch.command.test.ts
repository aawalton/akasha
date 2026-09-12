import { expect, test } from "bun:test"
import { DATA } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { refusingWith } from "akasha/commands/modules/calling/calling.module.test-fixtures.ts"
import {
  fetchRefused,
  folderOf,
  madeSaid,
  readIn,
  wroteFile,
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

const BYTES = new Uint8Array([1, 2, 3])

async function madeIt(folder: string): Promise<string> {
  return folder
}

async function wasThere(): Promise<undefined> {
  return undefined
}

async function wrote(): Promise<number> {
  return BYTES.length
}

async function couldNotWrite(): Promise<never> {
  throw new Error("no space left on device")
}

async function couldNotMakeIt(): Promise<never> {
  throw new Error("permission denied")
}

test("a folder this made is named as soon as it is made", async () => {
  const done: string[] = []
  await wroteFile("/album", "cat.png", BYTES, done, madeIt, wrote)
  expect(done).toEqual([madeSaid("/album")])
})

test("a folder already there is named nowhere, because nothing was made", async () => {
  const done: string[] = []
  await wroteFile("/album", "cat.png", BYTES, done, wasThere, wrote)
  expect(done).toEqual([])
})

test("a write that throws after the folder was made leaves that folder named", async () => {
  const done: string[] = []
  await expect(wroteFile("/album", "cat.png", BYTES, done, madeIt, couldNotWrite)).rejects.toThrow(
    "no space"
  )
  expect(done).toEqual([madeSaid("/album")])
})

test("a folder that could not be made leaves nothing named", async () => {
  const done: string[] = []
  await expect(wroteFile("/album", "cat.png", BYTES, done, couldNotMakeIt, wrote)).rejects.toThrow(
    "permission denied"
  )
  expect(done).toEqual([])
})

test("a refusal after the folder was made says the folder it made", () => {
  const said = fetchRefused(new Error("no space left on device"), "1AbC", [madeSaid("/album")])
  expect(said.refusals.join(" ")).toContain("/album")
  expect(said.report).toEqual([madeSaid("/album")])
})

test("a refusal before anything was made says nothing of what was done", () => {
  const said = fetchRefused(new Error("no space left on device"), "1AbC", [])
  expect(said.report).toEqual([])
  expect(said.refusals.join(" ")).not.toContain("stopped part way")
})

test("a file Drive cannot reach keeps its kind while naming the folder made", () => {
  const said = fetchRefused({ status: 404 }, "1AbC", [madeSaid("/album")])
  expect(said.code).toBe(DATA)
  expect(said.refusals.join(" ")).toContain("/album")
})
