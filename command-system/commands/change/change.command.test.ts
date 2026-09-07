import { afterAll, expect, test } from "bun:test"
import {
  idOf,
  indexedRepo,
  NAMER_CODE,
  NAMER_PAGE,
  pageOf,
  scratch,
} from "@akasha/indexes/indexing/testing"
import { removePage } from "../../../changes/checked/pages/remove-page/remove-page.change-checked.code.ts"
import type { World } from "../../../changes/modules/change-shadow/change-shadow.module.code.ts"
import { editsIn } from "../../../changes/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  type Loaded,
  loadedAt,
} from "../../../changes/runners/pages/change-running/change-running.change-runner.code.ts"
import type { Piping } from "../../piping/piping.module.code.ts"
import {
  type Applying,
  changing,
  editsFor,
  owedBy,
  owingBy,
  stamped,
} from "./change.command.code.ts"

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

let handed: Readonly<Record<string, string>> = {}

const REMOVE_PAGE: Loaded = {
  run: (world, given) => {
    handed = given as Readonly<Record<string, string>>
    return removePage(world, given as { at: string })
  },
  guards: [],
}

function repo(): string {
  return indexedRepo(SPARE)
}

function piping(said: string): Piping {
  return () => ({ bytes: new TextEncoder().encode(said) })
}

const NOTHING: Piping = () => ({ bytes: new Uint8Array(0) })

const APPLIED: string[] = []

const applying: Applying = async (message) => {
  APPLIED.push(message)
  return { report: [`applied ${message}`], refusals: [], code: 0 }
}

function asking(path: string, message: string): string {
  return `${taking(path)}apply: ${message}\n`
}

async function loading(world: World, at: string): Promise<Loaded | string> {
  if (at === "change-command/remove-page") return REMOVE_PAGE
  return await loadedAt(world, at)
}

function taking(path: string): string {
  return `at: ${path}\n`
}

function pathsIn(root: string): readonly string[] {
  const said = editsIn(root, PAGE)
  return "why" in said ? [] : said.rows.map((one) => one.path)
}

test("a change answers its edits and appends the edits beside the calling agent's page", async () => {
  const root = repo()

  const said = await changing(
    root,
    PAGE,
    ["remove-page"],
    piping(taking(NAMER_PAGE)),
    loading,
    applying
  )

  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect([...pathsIn(root)].sort()).toEqual([NAMER_CODE, NAMER_PAGE])
})

test("the edits are kept beside the agent's page rather than beside the page changed", async () => {
  const root = repo()

  await changing(root, PAGE, ["remove-page"], piping(taking(NAMER_PAGE)), loading, applying)

  expect(editsIn(root, NAMER_PAGE)).toEqual({ rows: [] })
  expect(pathsIn(root).length).toBe(2)
})

test("a change reads the world as every edit appended before that change had landed", async () => {
  const root = repo()
  await changing(root, PAGE, ["remove-page"], piping(taking(NAMER_PAGE)), loading, applying)

  const said = await changing(
    root,
    PAGE,
    ["remove-page"],
    piping(taking(NAMER_PAGE)),
    loading,
    applying
  )

  expect(said.refusals).toEqual([`\`${NAMER_PAGE}\` names no page, so no page is taken away`])
  expect([...pathsIn(root)].sort()).toEqual([NAMER_CODE, NAMER_PAGE])
})

test("two runs leave two sets of edits in the order the runs were made", async () => {
  const root = repo()

  await changing(root, PAGE, ["remove-page"], piping(taking(NAMER_PAGE)), loading, applying)
  await changing(root, PAGE, ["remove-page"], piping(taking(SPARE_PAGE)), loading, applying)

  const said = pathsIn(root)
  expect(said.length).toBe(4)
  expect([...said.slice(0, 2)].sort()).toEqual([NAMER_CODE, NAMER_PAGE])
  expect([...said.slice(2)].sort()).toEqual([SPARE_CODE, SPARE_PAGE])
})

test("a change that refuses appends nothing and says why that change refused", async () => {
  const root = repo()

  const said = await changing(
    root,
    PAGE,
    ["remove-page"],
    piping(taking(MISSING)),
    loading,
    applying
  )

  expect(said.refusals).toEqual([`\`${MISSING}\` names no page, so no page is taken away`])
  expect(pathsIn(root)).toEqual([])
})

test("a word reaching no change is refused by the address that reached nothing", async () => {
  const said = await changing(
    repo(),
    PAGE,
    ["remove-file"],
    piping(taking(NAMER_PAGE)),
    loading,
    applying
  )

  expect(said.refusals[0] ?? "").toContain("change-command/remove-file")
})

test("a call naming no change is refused with the changes this command runs", async () => {
  const said = await changing(repo(), PAGE, [], NOTHING, loading, applying)

  expect(said.refusals[0] ?? "").toContain("no change is named")
})

test("a flag said on the command line is refused", async () => {
  const said = await changing(
    repo(),
    PAGE,
    ["remove-page", "--file-path", NAMER_PAGE],
    piping(taking(NAMER_PAGE)),
    loading,
    applying
  )

  expect(said.refusals).toEqual([
    "`--file-path` is no flag this takes",
    `\`${NAMER_PAGE}\` is no flag this takes`,
  ])
})

test("a call piping nothing in is refused rather than run with no argument", async () => {
  const said = await changing(repo(), PAGE, ["remove-page"], NOTHING, loading, applying)

  expect(said.refusals[0] ?? "").toContain("standard input")
})

test("arguments that read as neither a value nor a body are refused", async () => {
  const said = await changing(
    repo(),
    PAGE,
    ["remove-page"],
    piping("nonsense\n"),
    loading,
    applying
  )

  expect(said.refusals[0] ?? "").toContain("neither")
})

test("a path outside the repository is refused", async () => {
  const said = await changing(
    repo(),
    PAGE,
    ["remove-page"],
    piping(taking("/etc/hosts")),
    loading,
    applying
  )

  expect(said.refusals.length).toBe(1)
  expect(said.refusals[0] ?? "").toContain("is no path inside the repository")
})

test("a path that is no page keeps no edits", async () => {
  const said = await changing(
    repo(),
    "akasha/notes.md",
    ["remove-page"],
    piping(taking(NAMER_PAGE)),
    loading,
    applying
  )

  expect(said.refusals).toEqual(["a path that is no page keeps no edits"])
})

test("a drop takes away every edit kept and names each edit that went", async () => {
  const root = repo()
  await changing(root, PAGE, ["remove-page"], piping(taking(NAMER_PAGE)), loading, applying)

  const said = await changing(root, PAGE, ["drop"], NOTHING, loading, applying)

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

  const said = await changing(root, PAGE, ["drop"], NOTHING, loading, applying)

  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(said.report).toEqual(["no edits are kept beside this agent's page, so nothing went"])
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

test("a change page saying its readers owe no reading is read as saying so", () => {
  expect(owedBy({ slug: "remove-page", readersOweReading: false })).toBe(false)
})

test("a change page saying its readers owe reading is read as saying so", () => {
  expect(owedBy({ slug: "add-file", readersOweReading: true })).toBe(true)
})

test("a change page saying nothing there leaves its readers owing the reading", () => {
  expect(owedBy({ slug: "add-file" })).toBe(true)
  expect(owedBy(null)).toBe(true)
})

test("a change owing its readers no reading stamps that on every edit it answers", () => {
  const said = stamped(
    { edits: [{ path: "a/b.ts", was: null, body: "held" }], refused: null },
    false,
    true
  )

  expect(said.edits).toEqual([
    { path: "a/b.ts", was: null, body: "held", readersOweReading: false },
  ])
})

test("a change whose writer owes no reading stamps that on every edit it answers", () => {
  const said = stamped(
    { edits: [{ path: "a/b.ts", was: null, body: "held" }], refused: null },
    true,
    false
  )

  expect(said.edits).toEqual([
    { path: "a/b.ts", was: null, body: "held", writerOwesReading: false },
  ])
})

test("a change page saying its writer owes no reading is read as saying so", () => {
  expect(owingBy({ slug: "add-file", writerOwesReading: false })).toBe(false)
  expect(owingBy({ slug: "add-file", writerOwesReading: true })).toBe(true)
  expect(owingBy(null)).toBe(true)
})

test("a change owing its readers reading stamps nothing on the edits it answers", () => {
  const said = stamped(
    { edits: [{ path: "a/b.ts", was: null, body: "held" }], refused: null },
    true,
    true
  )

  expect(said.edits).toEqual([{ path: "a/b.ts", was: null, body: "held" }])
})

test("a change reached under a page that is nowhere appends rows saying nothing of the readers", async () => {
  const root = repo()

  await changing(root, PAGE, ["remove-page"], piping(taking(NAMER_PAGE)), loading, applying)

  const said = editsIn(root, PAGE)
  expect("why" in said ? [] : said.rows.map((one) => one.readersOweReading)).toEqual([
    undefined,
    undefined,
  ])
})

test("an apply asked for in the arguments commits the message those arguments name", async () => {
  APPLIED.length = 0

  const said = await changing(
    repo(),
    PAGE,
    ["remove-page"],
    piping(asking(NAMER_PAGE, "takes the namer away")),
    loading,
    applying
  )

  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(APPLIED).toEqual(["takes the namer away"])
})

test("the apply asked for is not handed to the change as an argument", async () => {
  APPLIED.length = 0

  await changing(
    repo(),
    PAGE,
    ["remove-page"],
    piping(asking(NAMER_PAGE, "takes the namer away")),
    loading,
    applying
  )

  expect(Object.keys(handed)).toEqual(["at"])
})

test("an apply asked for says nothing of the edits being kept for a later apply", async () => {
  APPLIED.length = 0

  const said = await changing(
    repo(),
    PAGE,
    ["remove-page"],
    piping(asking(NAMER_PAGE, "takes the namer away")),
    loading,
    applying
  )

  expect(said.report.some((one) => one.includes("akasha apply"))).toBe(false)
  expect(said.report).toContain("applied takes the namer away")
})

test("a change that refuses applies nothing though an apply was asked for", async () => {
  APPLIED.length = 0
  const root = repo()

  const said = await changing(
    root,
    PAGE,
    ["remove-page"],
    piping(asking(MISSING, "takes the missing page away")),
    loading,
    applying
  )

  expect(said.refusals).toEqual([`\`${MISSING}\` names no page, so no page is taken away`])
  expect(APPLIED).toEqual([])
  expect(pathsIn(root)).toEqual([])
})

test("an apply asked for with no message is refused and appends nothing", async () => {
  APPLIED.length = 0
  const root = repo()

  const said = await changing(
    root,
    PAGE,
    ["remove-page"],
    piping(asking(NAMER_PAGE, "")),
    loading,
    applying
  )

  expect(said.refusals[0] ?? "").toContain("the message given is empty")
  expect(APPLIED).toEqual([])
  expect(pathsIn(root)).toEqual([])
})

test("a change asking for no apply keeps its edits for a later apply", async () => {
  APPLIED.length = 0

  const said = await changing(
    repo(),
    PAGE,
    ["remove-page"],
    piping(taking(NAMER_PAGE)),
    loading,
    applying
  )

  expect(APPLIED).toEqual([])
  expect(said.report.some((one) => one.includes("akasha apply"))).toBe(true)
})
