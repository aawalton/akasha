import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { blobIdOf, recordRead } from "../command-system/reading/reading.module.code.ts"
import { scratchWorld } from "../command-system/scratching/scratching.module.code.ts"
import { exportedAs } from "../pages-system/page/page-export-name/page-export-name.module.code.ts"
import { gatheredIn, NO_AGENT, unreadIn, warrantsIn } from "./warranting.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a04ee0-3078-7000-9069-e5db5da797ad"

const OTHER = "01a04ee0-3078-7000-9069-000000000000"

const PATH = "akasha/thing/thing.module.ts"

const OWED = "a reading this test says is owed"

const WARRANTS_AT = ".git/data/index/identity/context-warrant/slug"

const SEEDED_AT = ".git/data/warrant"

const MODULE_AT = join(import.meta.dir, "warranting.module.code.ts")

type Said = {
  readonly slug: string
  readonly runsOnRead?: boolean
  readonly runsOnWrite?: boolean
  readonly page?: string
  readonly code?: string
}

function standing(root: string, path: string, body: string): string {
  const at = join(root, path)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, body)
  return blobIdOf(new TextEncoder().encode(body))
}

function pageFor(one: Said, id: string): string {
  return [
    `export const ${exportedAs(one.slug)} = {`,
    `  id: "${id}",`,
    `  pageTypeSlug: "context-warrant",`,
    `  slug: "${one.slug}",`,
    `  code: "ts",`,
    `  test: "ts",`,
    `  runsOnRead: ${one.runsOnRead ?? true},`,
    `  runsOnWrite: ${one.runsOnWrite ?? true},`,
    `  transitive: false,`,
    `}`,
    "",
  ].join("\n")
}

function codeFor(one: Said): string {
  return [
    `import { standingOf } from ${JSON.stringify(MODULE_AT)}`,
    "",
    `export function ${exportedAs(one.slug)}(root, path) {`,
    "  const oid = standingOf(root, path)",
    `  return oid === null ? [] : [{ path, oid, owed: ${JSON.stringify(OWED)} }]`,
    "}",
    "",
  ].join("\n")
}

let minted = 0

function warranting(root: string, every: readonly Said[]): void {
  mkdirSync(join(root, WARRANTS_AT), { recursive: true })
  mkdirSync(join(root, SEEDED_AT), { recursive: true })
  for (const one of every) {
    minted = minted + 1
    const id = `01a04f58-0000-7000-8000-${String(minted).padStart(12, "0")}`
    const at = join(SEEDED_AT, `${one.slug}.context-warrant.ts`)
    standing(root, at, one.page ?? pageFor(one, id))
    standing(root, `${at.slice(0, -".ts".length)}.code.ts`, one.code ?? codeFor(one))
    standing(root, join(WARRANTS_AT, `${one.slug}.jsonl`), `${JSON.stringify({ path: at, id })}\n`)
  }
}

function rootWith(every: readonly Said[] = [{ slug: "says-so" }]): string {
  const root = scratch.rootFor("akasha-warranting-")
  warranting(root, every)
  return root
}

test("a path is asked what it warrants, and the warrants gathered say it", () => {
  const root = rootWith()
  const oid = standing(root, PATH, "one\n")
  expect(warrantsIn(root, PATH, "write")).toEqual([{ path: PATH, oid, owed: OWED }])
})

test("a warrant gathered says its slug, its page and the flags it stated", () => {
  const root = rootWith([{ slug: "says-so", runsOnRead: false }])
  expect(gatheredIn(root)).toEqual([
    {
      slug: "says-so",
      page: join(SEEDED_AT, "says-so.context-warrant.ts"),
      runsOnRead: false,
      runsOnWrite: true,
      transitive: false,
      warranting: expect.any(Function),
    },
  ])
})

test("a warrant that does not run on write is not run by a write", () => {
  const root = rootWith([{ slug: "says-so", runsOnWrite: false }])
  standing(root, PATH, "one\n")
  expect(warrantsIn(root, PATH, "write")).toEqual([])
  expect(unreadIn(root, AGENT, [PATH])).toEqual([])
  expect(warrantsIn(root, PATH, "read").length).toBe(1)
})

test("a warrant that answers to nothing that can be run is gathered by nobody", () => {
  const root = rootWith([{ slug: "says-so", code: "export const saysSo = 1\n" }])
  expect(() => gatheredIn(root)).toThrow("answers to nothing that can be run")
})

test("a warrant page stating no rule is gathered by nobody", () => {
  const root = rootWith([{ slug: "says-so", page: 'export const saysSo = { slug: "says-so" }\n' }])
  expect(() => gatheredIn(root)).toThrow("states no rule a runner can honour")
})

test("a warrant page answering to no export is gathered by nobody", () => {
  const root = rootWith([{ slug: "says-so", page: "export const held = 1\n" }])
  expect(() => gatheredIn(root)).toThrow("answers to no `saysSo`")
})

test("a path warranting nothing is asked and passes", () => {
  const root = rootWith()
  expect(unreadIn(root, AGENT, ["akasha/thing/new.module.ts"])).toEqual([])
})

test("a path the record holds no reading of is refused", () => {
  const root = rootWith()
  standing(root, PATH, "one\n")
  const said = unreadIn(root, AGENT, [PATH])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("the record does not show you read this")
})

test("a reading of the body standing now answers for it", () => {
  const root = rootWith()
  const oid = standing(root, PATH, "one\n")
  recordRead(root, AGENT, { path: PATH, oid, seenAt: 1 })
  expect(unreadIn(root, AGENT, [PATH])).toEqual([])
})

test("a reading of another body is refused, and both ids are said", () => {
  const root = rootWith()
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
  const root = rootWith()
  const oid = standing(root, PATH, "one\n")
  recordRead(root, AGENT, { path: PATH, oid, seenAt: 0 })
  expect(unreadIn(root, AGENT, [PATH])).toEqual([])
})

test("one agent's reading answers for no other agent's write", () => {
  const root = rootWith()
  const oid = standing(root, PATH, "one\n")
  recordRead(root, OTHER, { path: PATH, oid, seenAt: 1 })
  expect(unreadIn(root, AGENT, [PATH]).length).toBe(1)
})

test("a refusal says what the reading is owed for", () => {
  const root = rootWith()
  standing(root, PATH, "one\n")
  expect(unreadIn(root, AGENT, [PATH])[0]).toContain(OWED)
})

test("a refusal names the read that would answer the warrant", () => {
  const root = rootWith()
  standing(root, PATH, "one\n")
  expect(unreadIn(root, AGENT, [PATH])[0]).toContain(`akasha read --file-path ${PATH}`)
})

test("every path is answered for, not only the first", () => {
  const root = rootWith()
  const other = "akasha/thing/other.module.ts"
  standing(root, PATH, "one\n")
  standing(root, other, "two\n")
  expect(unreadIn(root, AGENT, [PATH, other]).length).toBe(2)
})

test("a path named twice is refused once", () => {
  const root = rootWith()
  standing(root, PATH, "one\n")
  expect(unreadIn(root, AGENT, [PATH, PATH]).length).toBe(1)
})

test("a path warranted by two warrants is judged once", () => {
  const root = rootWith([{ slug: "says-so" }, { slug: "says-so-again" }])
  standing(root, PATH, "one\n")
  expect(warrantsIn(root, PATH, "write").length).toBe(2)
  expect(unreadIn(root, AGENT, [PATH]).length).toBe(1)
})

test("a call charged to no agent is refused whole", () => {
  const root = rootWith()
  standing(root, PATH, "one\n")
  expect(unreadIn(root, null, [PATH])).toEqual([NO_AGENT])
})

test("a call charged to no agent is refused even where nothing stands", () => {
  const root = rootWith()
  expect(unreadIn(root, null, ["akasha/thing/new.module.ts"])).toEqual([NO_AGENT])
})

test("no agent is told as something that should not be possible", () => {
  expect(NO_AGENT).toContain("should not be possible")
  expect(NO_AGENT).toContain("`AGENT_ID`")
})
