import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { blobIdOf, recordRead } from "./reading.module.code.ts"
import { scratchWorld } from "./scratching.module.code.ts"
import { ITSELF, NO_AGENT, unreadIn, warrantsIn } from "./warranting.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a04ee0-3078-7000-9069-e5db5da797ad"

const OTHER = "01a04ee0-3078-7000-9069-000000000000"

const PATH = "akasha/thing/thing.module.ts"

function standing(root: string, path: string, body: string): string {
  const at = join(root, path)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, body)
  return blobIdOf(new TextEncoder().encode(body))
}

test("a file warrants itself, by the body standing at it", () => {
  const root = scratch.rootFor("akasha-warranting-")
  const oid = standing(root, PATH, "one\n")
  expect(warrantsIn(root, PATH)).toEqual([{ path: PATH, oid, owed: ITSELF }])
})

test("a file not yet standing warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-warranting-")
  expect(warrantsIn(root, "akasha/thing/new.module.ts")).toEqual([])
})

test("a path warranting nothing is asked and passes", () => {
  const root = scratch.rootFor("akasha-warranting-")
  expect(unreadIn(root, AGENT, ["akasha/thing/new.module.ts"])).toEqual([])
})

test("a path the record holds no reading of is refused", () => {
  const root = scratch.rootFor("akasha-warranting-")
  standing(root, PATH, "one\n")
  const said = unreadIn(root, AGENT, [PATH])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("the record does not show you read this")
})

test("a reading of the body standing now answers for it", () => {
  const root = scratch.rootFor("akasha-warranting-")
  const oid = standing(root, PATH, "one\n")
  recordRead(root, AGENT, { path: PATH, oid, seenAt: 1 })
  expect(unreadIn(root, AGENT, [PATH])).toEqual([])
})

test("a reading of another body is refused, and both ids are said", () => {
  const root = scratch.rootFor("akasha-warranting-")
  const was = blobIdOf(new TextEncoder().encode("one\n"))
  const oid = standing(root, PATH, "two\n")
  recordRead(root, AGENT, { path: PATH, oid: was, seenAt: 1 })
  const said = unreadIn(root, AGENT, [PATH])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("it has changed since")
  expect(said[0]).toContain(was)
  expect(said[0]).toContain(oid)
})

test("when the body was read is not asked, only which body", () => {
  const root = scratch.rootFor("akasha-warranting-")
  const oid = standing(root, PATH, "one\n")
  recordRead(root, AGENT, { path: PATH, oid, seenAt: 0 })
  expect(unreadIn(root, AGENT, [PATH])).toEqual([])
})

test("one agent's reading answers for no other agent's write", () => {
  const root = scratch.rootFor("akasha-warranting-")
  const oid = standing(root, PATH, "one\n")
  recordRead(root, OTHER, { path: PATH, oid, seenAt: 1 })
  expect(unreadIn(root, AGENT, [PATH]).length).toBe(1)
})

test("a refusal says what the reading is owed for", () => {
  const root = scratch.rootFor("akasha-warranting-")
  standing(root, PATH, "one\n")
  expect(unreadIn(root, AGENT, [PATH])[0]).toContain(ITSELF)
})

test("a refusal names the read that would answer the warrant", () => {
  const root = scratch.rootFor("akasha-warranting-")
  standing(root, PATH, "one\n")
  expect(unreadIn(root, AGENT, [PATH])[0]).toContain(`akasha read --file-path ${PATH}`)
})

test("every path is answered for, not only the first", () => {
  const root = scratch.rootFor("akasha-warranting-")
  const other = "akasha/thing/other.module.ts"
  standing(root, PATH, "one\n")
  standing(root, other, "two\n")
  expect(unreadIn(root, AGENT, [PATH, other]).length).toBe(2)
})

test("a path named twice is refused once", () => {
  const root = scratch.rootFor("akasha-warranting-")
  standing(root, PATH, "one\n")
  expect(unreadIn(root, AGENT, [PATH, PATH]).length).toBe(1)
})

test("a call charged to no agent is refused whole", () => {
  const root = scratch.rootFor("akasha-warranting-")
  standing(root, PATH, "one\n")
  expect(unreadIn(root, null, [PATH])).toEqual([NO_AGENT])
})

test("a call charged to no agent is refused even where nothing stands", () => {
  const root = scratch.rootFor("akasha-warranting-")
  expect(unreadIn(root, null, ["akasha/thing/new.module.ts"])).toEqual([NO_AGENT])
})

test("no agent is told as something that should not be possible", () => {
  expect(NO_AGENT).toContain("should not be possible")
  expect(NO_AGENT).toContain("`AGENT_ID`")
})

test("a directory standing at the path warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-warranting-")
  mkdirSync(join(root, "akasha/thing"), { recursive: true })
  expect(warrantsIn(root, "akasha/thing")).toEqual([])
})
