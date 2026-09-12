import { afterAll, expect, test } from "bun:test"
import { join } from "node:path"
import {
  parseSeats,
  readSubagentsIn,
  TRANSCRIPTS_CALL,
} from "akasha/code/editor/extension/transcript-sources/transcript-sources.module.code.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { writing } from "akasha/utils/fs/scratching/scratching.module.test-fixtures.ts"

const ROW = {
  agentId: "01a0-aranya",
  seatName: "aranya",
  transcriptPath: "/var/tmp/aranya.jsonl",
}

test("the call names the export its own slug spells, as the command server resolves it", () => {
  expect(TRANSCRIPTS_CALL.exported).toBe(exportedAs(TRANSCRIPTS_CALL.slug))
})

test("every seat's transcript is asked for in one call taking no argument", () => {
  expect(TRANSCRIPTS_CALL.args).toEqual([])
})

test("a row naming an agent id, a seat name and a transcript path is answered whole", () => {
  expect(parseSeats({ seats: [ROW] })).toEqual([ROW])
})

test("an answer carrying no seats array is an error", () => {
  expect(() => parseSeats({})).toThrow(/carries no `seats` array/)
  expect(() => parseSeats(null)).toThrow(/carries no `seats` array/)
  expect(() => parseSeats({ seats: "aranya" })).toThrow(/carries no `seats` array/)
})

test("a row that is no object is an error naming which row", () => {
  expect(() => parseSeats({ seats: [ROW, "aranya"] })).toThrow(/seats\[1\] is not an object/)
})

test("a row missing any of the three names is an error naming which row", () => {
  const { seatName, ...missing } = ROW
  expect(seatName).toBe("aranya")
  expect(() => parseSeats({ seats: [missing] })).toThrow(
    /seats\[0\] carries no agentId, seatName and transcriptPath/
  )
})

test("an answer carrying no rows answers none", () => {
  expect(parseSeats({ seats: [] })).toEqual([])
})

const scratch = scratchWorld()

afterAll(scratch.sweep)

const HELD = "held"

function subagentsAt(name: string, files: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor(`akasha-transcript-sources-${name}-`)
  for (const [at, body] of Object.entries(files)) writing(root, join(HELD, at), body)
  return join(root, HELD)
}

test("a subagent is found by the meta file beside its transcript", async () => {
  const at = subagentsAt("found", {
    "one.meta.json": JSON.stringify({
      toolUseId: "tool-1",
      agentType: "fork",
      description: "a thing",
    }),
    "one.jsonl": "",
  })
  const found = await readSubagentsIn(at)

  expect(found.get("tool-1")).toEqual({
    toolUseId: "tool-1",
    agentType: "fork",
    description: "a thing",
    filePath: join(at, "one.jsonl"),
  })
})

test("a subagent whose transcript file is absent is not answered", async () => {
  const at = subagentsAt("absent", {
    "one.meta.json": JSON.stringify({ toolUseId: "tool-1" }),
  })
  expect((await readSubagentsIn(at)).size).toBe(0)
})

test("a meta file that is not JSON is passed over rather than raised", async () => {
  const at = subagentsAt("unparsed", { "one.meta.json": "{", "one.jsonl": "" })
  expect((await readSubagentsIn(at)).size).toBe(0)
})

test("a file that is no meta file is passed over", async () => {
  const at = subagentsAt("other", { "one.jsonl": "" })
  expect((await readSubagentsIn(at)).size).toBe(0)
})

test("a subagent naming no type and no description answers null for each", async () => {
  const at = subagentsAt("bare", {
    "one.meta.json": JSON.stringify({ toolUseId: "tool-2" }),
    "one.jsonl": "",
  })
  const found = await readSubagentsIn(at)

  expect(found.get("tool-2")?.agentType).toBe(null)
  expect(found.get("tool-2")?.description).toBe(null)
})

test("a directory that cannot be listed answers no subagents", async () => {
  const at = subagentsAt("nowhere", {})
  expect((await readSubagentsIn(join(at, "gone"))).size).toBe(0)
})
