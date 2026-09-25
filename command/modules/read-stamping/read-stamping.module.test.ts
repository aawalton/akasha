import { afterAll, expect, test } from "bun:test"
import { blobIdOf } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { type FileChange, stating } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { PUT_BACK } from "akasha/command/modules/change-freshness/change-freshness.module.code.ts"
import {
  A,
  bytes,
  PAGE,
  repoWith,
  scratch,
} from "akasha/command/modules/landing/landing.module.test-fixtures.ts"
import {
  movedSinceRead,
  readFromIn,
  readStamped,
  takenStamped,
} from "akasha/command/modules/read-stamping/read-stamping.module.code.ts"
import { writing } from "akasha/file/system/modules/scratching/scratching.module.test-fixtures.ts"
import { headOf } from "akasha/git/modules/head-commit/head-commit.module.code.ts"

afterAll(() => {
  scratch.sweep()
})

const NONE = { wrote: new Set<string>(), grouped: new Set<string>() }

const FOLDED_AT = "akasha/a.domain.referenced-by.jsonl"

const GENERATED_AT = "akasha/a.domain.refs.jsonl"

const pageRepo = (): string => repoWith({ [PAGE]: A })

test("an edit whose writer owes reading carries the id of the body on disk at its path", () => {
  const edit: FileChange = { kind: "replace", path: PAGE, contentFrom: "a", contentTo: "b" }
  expect(readStamped(pageRepo(), [edit])).toEqual([{ ...edit, readOid: blobIdOf(bytes(A)) }])
})

test("an edit to no body, a move, an edit owing no reading and one carrying an id are left", () => {
  const edits: readonly FileChange[] = [
    { kind: "add", path: "akasha/new.ts", content: "new\n" },
    { kind: "move", pathFrom: PAGE, pathTo: "akasha/moved.ts" },
    { kind: "remove", path: PAGE, writerOwesReading: false },
    { kind: "remove", path: PAGE, readOid: "kept" },
  ]
  expect(readStamped(pageRepo(), edits)).toEqual(edits)
})

test("the id held at a path is the first an edit there carries", () => {
  const said = stating([
    { kind: "replace", path: PAGE, contentFrom: "a", contentTo: "b", readOid: "first" },
    { kind: "replace", path: PAGE, contentFrom: "b", contentTo: "c", readOid: "second" },
    { kind: "add", path: "akasha/new.ts", content: "new\n" },
  ])
  expect([...readFromIn(said)]).toEqual([[PAGE, "first"]])
})

test("a body at HEAD with another id than the one held is named, with the tail last", () => {
  const root = pageRepo()
  const read = new Map([[PAGE, blobIdOf(bytes(`${A}\n`))]])
  const said = movedSinceRead(root, headOf(root), read, NONE, "tail")
  expect(said?.[0]).toContain(PAGE)
  expect(said?.[0] ?? "").toEndWith(PUT_BACK)
  expect(said?.at(-1)).toBe("tail")
})

test("a body at HEAD with the id held has not moved", () => {
  const root = pageRepo()
  const read = new Map([[PAGE, blobIdOf(bytes(A))]])
  expect(movedSinceRead(root, headOf(root), read, NONE, "tail")).toBe(null)
})

test("a path neither HEAD nor disk holds a body at has moved", () => {
  const root = pageRepo()
  const read = new Map([["akasha/gone.ts", blobIdOf(bytes(A))]])
  expect(movedSinceRead(root, headOf(root), read, NONE, "tail")?.[0]).toContain("gone.ts")
})

test("a sighting a subagent left stamps nothing, and the reading before it still does", () => {
  const root = scratch.rootFor("akasha-stamping-")
  const seatPage = "agent/seat/pages/held/held.seat.ts"
  const by = "seat-id--sub-one"
  const lines = [
    { path: PAGE, oid: "read", seenAt: 1, carriedOid: null, readBy: by },
    { path: PAGE, oid: "seen", seenAt: 2, carriedOid: null, linesShown: [1], readBy: by },
  ]
  const at = "agent/seat/pages/held/held.seat.subagent-reads.uncommitted.jsonl"
  writing(root, at, lines.map((one) => `${JSON.stringify(one)}\n`).join(""))
  const edit: FileChange = { kind: "replace", path: PAGE, contentFrom: "a", contentTo: "b" }
  const said = takenStamped(root, seatPage, [{ leftBy: "held-sub-one", edit }])
  expect(said).toEqual([{ ...edit, readOid: "read" }])
})

test("a path a landing folds and one a machine generates are held to no id", () => {
  const root = pageRepo()
  const read = new Map([
    [FOLDED_AT, blobIdOf(bytes("one\n"))],
    [GENERATED_AT, blobIdOf(bytes("generated once\n"))],
  ])
  const machine = { wrote: new Set([GENERATED_AT]), grouped: new Set<string>() }
  expect(movedSinceRead(root, headOf(root), read, machine, "tail")).toBe(null)
})
