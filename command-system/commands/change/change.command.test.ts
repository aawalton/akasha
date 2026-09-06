import { afterAll, expect, test } from "bun:test"
import {
  idOf,
  indexedRepo,
  NAMER_CODE,
  NAMER_PAGE,
  pageOf,
  scratch,
} from "@akasha/indexes/indexing/testing"
import { editsIn } from "../../../changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { changing, editsFor } from "./change.command.code.ts"

afterAll(scratch.sweep)

const PAGE = "akasha/seat-system/seats/pages/tester.seat.ts"

const MISSING = "akasha/one/missing.module.ts"

const SPARE_PAGE = "akasha/three/spare.module.ts"

const SPARE_CODE = "akasha/three/spare.module.code.ts"

const SPARE: Readonly<Record<string, string>> = {
  [SPARE_PAGE]: pageOf({
    id: idOf("d"),
    pageTypeSlug: "module",
    slug: "spare",
    definition: "a page importing the page held",
    code: "ts",
  }),
  [SPARE_CODE]: 'import { kept } from "../one/held.module.code.ts"\n\nexport const spare = kept\n',
}

function repo(): string {
  return indexedRepo(SPARE)
}

function pathsIn(root: string): readonly string[] {
  const said = editsIn(root, PAGE)
  return "why" in said ? [] : said.rows.map((one) => one.path)
}

test("a change answers its edits and appends the edits beside the calling agent's page", async () => {
  const root = repo()

  const said = await changing(root, PAGE, ["remove-page", "--file-path", NAMER_PAGE])

  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect([...pathsIn(root)].sort()).toEqual([NAMER_CODE, NAMER_PAGE])
})

test("the edits are kept beside the agent's page rather than beside the page changed", async () => {
  const root = repo()

  await changing(root, PAGE, ["remove-page", "--file-path", NAMER_PAGE])

  expect(editsIn(root, NAMER_PAGE)).toEqual({ rows: [] })
  expect(pathsIn(root).length).toBe(2)
})

test("a change reads the world as every edit appended before that change had landed", async () => {
  const root = repo()
  await changing(root, PAGE, ["remove-page", "--file-path", NAMER_PAGE])

  const said = await changing(root, PAGE, ["remove-page", "--file-path", NAMER_PAGE])

  expect(said.refusals).toEqual([`\`${NAMER_PAGE}\` names no page, so no page is taken away`])
  expect([...pathsIn(root)].sort()).toEqual([NAMER_CODE, NAMER_PAGE])
})

test("two runs leave two sets of edits in the order the runs were made", async () => {
  const root = repo()

  await changing(root, PAGE, ["remove-page", "--file-path", NAMER_PAGE])
  await changing(root, PAGE, ["remove-page", "--file-path", SPARE_PAGE])

  const said = pathsIn(root)
  expect(said.length).toBe(4)
  expect([...said.slice(0, 2)].sort()).toEqual([NAMER_CODE, NAMER_PAGE])
  expect([...said.slice(2)].sort()).toEqual([SPARE_CODE, SPARE_PAGE])
})

test("a change that refuses appends nothing and says why that change refused", async () => {
  const root = repo()

  const said = await changing(root, PAGE, ["remove-page", "--file-path", MISSING])

  expect(said.refusals).toEqual([`\`${MISSING}\` names no page, so no page is taken away`])
  expect(pathsIn(root)).toEqual([])
})

test("a word naming no change is refused with the changes this command runs", async () => {
  const said = await changing(repo(), PAGE, ["remove-file", "--file-path", NAMER_PAGE])

  expect(said.refusals).toEqual([
    "`remove-file` is no change this runs, which takes `remove-page`",
    "`drop` takes away the edits kept, and is the one word here naming no change",
  ])
})

test("a call naming no change is refused with the changes this command runs", async () => {
  const said = await changing(repo(), PAGE, [])

  expect(said.refusals).toEqual(["no change is named, and this runs one of `remove-page`"])
})

test("a flag the change named does not take is refused", async () => {
  const said = await changing(repo(), PAGE, ["remove-page", "--message", "why"])

  expect(said.refusals).toEqual([
    "`--message` is no flag this takes",
    "`why` is no flag this takes",
  ])
})

test("a call naming no path is refused", async () => {
  const said = await changing(repo(), PAGE, ["remove-page"])

  expect(said.refusals).toEqual([
    "--file-path names the path the change acts on, and none is given",
  ])
})

test("a path outside the repository is refused", async () => {
  const said = await changing(repo(), PAGE, ["remove-page", "--file-path", "/etc/hosts"])

  expect(said.refusals.length).toBe(1)
  expect(said.refusals[0] ?? "").toContain("is no path inside the repository")
})

test("a path that is no page keeps no edits", async () => {
  const said = await changing(repo(), "akasha/notes.md", ["remove-page", "--file-path", NAMER_PAGE])

  expect(said.refusals).toEqual(["a path that is no page keeps no edits"])
})

test("a drop takes away every edit kept and names each edit that went", async () => {
  const root = repo()
  await changing(root, PAGE, ["remove-page", "--file-path", NAMER_PAGE])

  const said = await changing(root, PAGE, ["drop"])

  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(said.report).toEqual([
    ...[`takes ${NAMER_CODE} away`, `takes ${NAMER_PAGE} away`].sort(),
    "these edits are gone, and no apply lands them",
  ])
  expect(pathsIn(root)).toEqual([])
})

test("a drop over no edit kept says so rather than refusing", async () => {
  const root = repo()

  const said = await changing(root, PAGE, ["drop"])

  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(said.report).toEqual(["no edits are kept beside this agent's page, so nothing went"])
})

test("a flag given to a drop is refused", async () => {
  const root = repo()

  const said = await changing(root, PAGE, ["drop", "--file-path", NAMER_PAGE])

  expect(said.refusals).toEqual([
    "`--file-path` is no flag this takes",
    `\`${NAMER_PAGE}\` is no flag this takes`,
  ])
  expect(pathsIn(root)).toEqual([])
})

test("an edit writing a body becomes a change carrying that body", () => {
  expect(editsFor([{ path: "a/b.ts", was: null, body: "held" }])).toEqual([
    { path: "a/b.ts", body: new TextEncoder().encode("held") },
  ])
})

test("an edit stating no body becomes a change taking that path away", () => {
  expect(editsFor([{ path: "a/b.ts", was: "held", body: null }])).toEqual([
    { path: "a/b.ts", body: null },
  ])
})

test("a move becomes the path it came from taken away beside the path it lands at", () => {
  expect(editsFor([{ path: "a/two.ts", was: "held", body: "held", from: "a/one.ts" }])).toEqual([
    { path: "a/one.ts", body: null },
    { path: "a/two.ts", body: new TextEncoder().encode("held") },
  ])
})
