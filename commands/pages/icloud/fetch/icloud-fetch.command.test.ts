import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  answering,
  OPERATIONAL,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refusingWith } from "akasha/commands/modules/calling/calling.module.test-fixtures.ts"
import type {
  Downloading,
  Target,
} from "akasha/commands/pages/icloud/fetch/icloud-fetch.command.code.ts"
import {
  folderOf,
  icloudFetch,
  readIn,
  wroteEach,
} from "akasha/commands/pages/icloud/fetch/icloud-fetch.command.code.ts"

const ALBUM = "https://share.icloud.com/photos/0ABCdef"

const TARGETS: readonly Target[] = [
  { asset: { downloadURL: "https://icloud/one" }, path: "/nowhere/one.jpg" },
  { asset: { downloadURL: "https://icloud/two" }, path: "/nowhere/two.jpg" },
  { asset: { downloadURL: "https://icloud/three" }, path: "/nowhere/three.jpg" },
]

const ONE = "path\t/nowhere/one.jpg"

const TWO = "path\t/nowhere/two.jpg"

const THREE = "path\t/nowhere/three.jpg"

function downloading(upTo: number): Downloading {
  let reached = 0
  return async (_url, at) => {
    reached += 1
    if (reached > upTo) throw new OperationalError(`the download for ${at} failed`)
  }
}

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

test("the folder is read from the folder flag", () => {
  const read = readIn([ALBUM, "--output", "/pictures"])

  if ("refused" in read) throw new Error("this was refused")
  expect(read.said.get("--output")).toBe("/pictures")
})

test("the folder flag said twice is refused", () => {
  expect(refusedBy([ALBUM, "--output", "/a", "--output", "/b"])[0]).toContain("twice")
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

test("each photo is named as soon as that photo reaches the disk", async () => {
  const done: string[] = []

  await wroteEach(TARGETS, false, downloading(3), done)
  expect(done).toEqual([ONE, TWO, THREE])
})

test("a photo is named as JSON where the call asked for JSON", async () => {
  const done: string[] = []

  await wroteEach(TARGETS.slice(0, 1), true, downloading(1), done)
  expect(done).toEqual(['{"path":"/nowhere/one.jpg"}'])
})

test("a call that threw part way names in its refusal each photo it had written", async () => {
  const held = await answering(async (done) => {
    await wroteEach(TARGETS, false, downloading(2), done)
    return told(done)
  })

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([ONE, TWO])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain("/nowhere/one.jpg")
  expect(last).toContain("/nowhere/two.jpg")
  expect(last).not.toContain("/nowhere/three.jpg")
})

test("a call that threw before a photo reached the disk names no photo", async () => {
  const held = await answering(async (done) => {
    await wroteEach(TARGETS, false, downloading(0), done)
    return told(done)
  })

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})
