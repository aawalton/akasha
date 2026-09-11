import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  applied,
  askedIn,
  type Carried,
  messageFor,
} from "akasha/commands/modules/applying/applying.module.code.ts"
import type { Running } from "akasha/commands/modules/drafting/drafting.module.code.ts"
import { landing } from "akasha/commands/modules/landing/landing.module.code.ts"
import {
  A,
  ADMITS,
  bytes,
  CARRIED,
  PAGE,
  pagesRepo,
  REFUSES,
  repoWith,
  rowsIn,
  scratch,
} from "akasha/commands/modules/landing/landing.module.test-fixtures.ts"
import { readingIn } from "akasha/commands/modules/reading/reading.module.code.ts"
import { said as gitSaid } from "akasha/git/running/git-running.module.code.ts"
import { noImportersFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"

const AGENT = "01a05f00-0000-7000-8000-000000000001"

const MORE = `${A}// drafted\n`

const OWES: Running = { checks: true, writerOwesReading: true, readersOweReading: true }

function rowAt(path: string, content = ""): FileChange {
  return { kind: "add", path, content }
}

function carrying(body: string, running: Running = OWES, owed?: boolean): Carried {
  return {
    rows: [rowAt(PAGE, body)],
    running,
    ...(owed === undefined ? {} : { owed: new Map([[PAGE, owed]]) }),
  }
}

afterAll(() => {
  scratch.sweep()
})

async function indexed(): Promise<string> {
  const root = repoWith({ "seed.txt": "held" })
  await landing(root, rowsIn(root, CARRIED), "held", ADMITS)
  noImportersFiled(root)
  await landing(root, rowsIn(root, [{ path: PAGE, body: bytes(A) }]), "held", ADMITS)
  return root
}

function headOid(root: string, path: string): string {
  return gitSaid(root, ["rev-parse", `HEAD:${path}`]).trim()
}

test("an apply takes a measure beside its message, and refuses any other key", () => {
  expect(askedIn({})).toEqual({ message: null, glass: null, measure: false })
  expect(askedIn({ measure: "true" })).toEqual({ message: null, glass: null, measure: true })
  expect(askedIn({ held: "1" })).toEqual({
    refusals: ["`held` is no argument an apply takes"],
  })
})

test("a measure saying anything but true is refused", () => {
  expect(askedIn({ measure: "yes" })).toEqual({
    refusals: ["`measure` takes `true`, and this one says something else"],
  })
})

test("an apply given no message says the act and the paths that apply lands", () => {
  const rows = [rowAt("akasha/two.ts"), rowAt("akasha/one.ts")]
  expect(messageFor(null, rows)).toBe("apply akasha/one.ts, akasha/two.ts")
})

test("an apply carrying more than three paths says the act and how many landed", () => {
  const named = ["a.ts", "b.ts", "c.ts", "d.ts"]
  expect(
    messageFor(
      null,
      named.map((one) => rowAt(one))
    )
  ).toBe("apply 4 files")
})

test("an apply given a message commits that message rather than a composed one", () => {
  expect(messageFor("held", [rowAt("akasha/one.ts")])).toBe("held")
})

test("an apply lands the bodies handed in, names and records them, and moves a path", async () => {
  const root = await indexed()
  writeFileSync(join(root, "held.uncommitted.ts"), "unsaid")
  const moves = [{ from: "held.uncommitted.ts", to: "deep/held.uncommitted.ts" }]
  const said = await applied(root, AGENT, "applied", ADMITS, null, moves, carrying(MORE))
  if ("refusals" in said) throw new Error(said.refusals.join("; "))
  expect(readFileSync(join(root, PAGE), "utf8")).toBe(MORE)
  expect(said.formatted).toEqual([])
  expect(said.landed).toEqual([PAGE])
  expect(readingIn(root, AGENT, PAGE)?.oid).toBe(headOid(root, PAGE))
  expect(readFileSync(join(root, "deep/held.uncommitted.ts"), "utf8")).toBe("unsaid")
  expect(existsSync(join(root, "held.uncommitted.ts"))).toBe(false)
})

test("an apply appending puts its content after the body the path holds on disk", async () => {
  const root = await indexed()
  const rows: readonly FileChange[] = [{ kind: "append", path: PAGE, content: "// drafted\n" }]
  const said = await applied(root, AGENT, "applied", ADMITS, null, [], { rows, running: OWES })
  if ("refusals" in said) throw new Error(said.refusals.join("; "))

  expect(readFileSync(join(root, PAGE), "utf8")).toBe(MORE)
})

test("two appends onto one path in one apply leave the content of both", async () => {
  const root = await indexed()
  const rows: readonly FileChange[] = [
    { kind: "append", path: PAGE, content: "// drafted\n" },
    { kind: "append", path: PAGE, content: "// again\n" },
  ]
  const said = await applied(root, AGENT, "applied", ADMITS, null, [], { rows, running: OWES })
  if ("refusals" in said) throw new Error(said.refusals.join("; "))

  expect(readFileSync(join(root, PAGE), "utf8")).toBe(`${MORE}// again\n`)
})

test("an apply handed no bodies is nothing to apply", async () => {
  const said = await applied("/nowhere", AGENT, "applied", ADMITS, null, [], null)
  expect("refusals" in said).toBe(true)
})

test("an apply the gate refused leaves the body as it was and records the reading", async () => {
  const root = pagesRepo()
  expect(readingIn(root, AGENT, PAGE)).toBeNull()
  const said = await applied(root, AGENT, "applied", REFUSES, null, [], carrying(MORE))
  expect("refusals" in said).toBe(true)
  expect(readFileSync(join(root, PAGE), "utf8")).toBe(A)
  expect(readingIn(root, AGENT, PAGE)?.oid).toBe(headOid(root, PAGE))
})

test("a path the change moved under is recorded as read from the body at HEAD", async () => {
  const root = pagesRepo()
  writeFileSync(join(root, PAGE), `// first\n${A}`)
  gitSaid(root, ["add", "--", PAGE])
  gitSaid(root, ["commit", "-q", "-m", "moved", "--", PAGE])
  await applied(root, AGENT, "applied", REFUSES, null, [], carrying(MORE))
  expect(readingIn(root, AGENT, PAGE)?.oid).toBe(headOid(root, PAGE))
})

const UNEXPORTABLE_AT = "akasha/2026-08-20.domain.ts"

const UNEXPORTABLE =
  "export const held = {\n" +
  '  id: "01a04e11-0000-7000-8000-000000000031",\n' +
  '  pageTypeSlug: "domain",\n' +
  '  slug: "2026-08-20",\n' +
  "}\n"

test("an apply refuses a page whose slug names no export", async () => {
  const root = pagesRepo()
  const rows = [rowAt(UNEXPORTABLE_AT, UNEXPORTABLE)]
  const said = await applied(root, AGENT, "applied", ADMITS, null, [], { rows, running: OWES })
  if (!("refusals" in said)) throw new Error("the apply landed a page naming no export")
  expect(said.refusals.join("\n")).toContain("which no `export const` may be declared under")
  expect(existsSync(join(root, UNEXPORTABLE_AT))).toBe(false)
})
