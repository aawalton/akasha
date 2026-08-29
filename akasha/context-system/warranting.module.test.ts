import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { blobIdOf, recordRead } from "../command-system/reading.module.code.ts"
import { scratchWorld } from "../command-system/scratching.module.code.ts"
import { ITSELF, NO_AGENT, TYPE, unreadIn, warrantsIn } from "./warranting.module.code.ts"

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

let minted = 0

function indexed(root: string, at: string, line: string): void {
  standing(root, join(".git/data/index", at), `${line}\n`)
}

function pageType(root: string, slug: string, above: string | null): string {
  minted = minted + 1
  const id = `01a04bc4-0000-7000-8000-${String(minted).padStart(12, "0")}`
  const path = `akasha/${slug}/${slug}.page-type.ts`
  const said = above === null ? "" : `, extendsSlug: "page-type/${above}"`
  standing(
    root,
    path,
    `export const held = { id: "${id}", pageTypeSlug: "page-type", slug: "${slug}"${said} }\n`
  )
  indexed(root, `identity/page-type/slug/${slug}.jsonl`, JSON.stringify({ path, id }))
  return path
}

function typeWorld(root: string): readonly string[] {
  const page = pageType(root, "page", null)
  const domain = pageType(root, "domain", "page")
  const module = pageType(root, "module", "domain")
  return [module, domain, page]
}

function pathsOf(root: string, path: string): readonly string[] {
  return warrantsIn(root, path).map((one) => one.path)
}

test("a page warrants its type, and every type that one extends", () => {
  const root = scratch.rootFor("akasha-warranting-")
  const chain = typeWorld(root)
  standing(root, PATH, "one\n")
  expect(pathsOf(root, PATH)).toEqual([PATH, ...chain])
})

test("a type warrants the body standing at the type's page", () => {
  const root = scratch.rootFor("akasha-warranting-")
  typeWorld(root)
  standing(root, PATH, "one\n")
  const held = warrantsIn(root, PATH)[1]
  expect(held?.oid).toBe(
    blobIdOf(new TextEncoder().encode(readFileSync(join(root, held?.path ?? ""), "utf8")))
  )
  expect(held?.owed).toBe(TYPE)
})

test("a file standing beside a page warrants no type of its own", () => {
  const root = scratch.rootFor("akasha-warranting-")
  typeWorld(root)
  indexed(
    root,
    "schema/page-property/slug/code.jsonl",
    JSON.stringify({ pageTypeSlug: "file-property", targetPageTypeSlug: null })
  )
  const beside = "akasha/thing/thing.module.code.ts"
  standing(root, beside, "body\n")
  expect(pathsOf(root, beside)).toEqual([beside])
})

test("a file named for no page type warrants no type", () => {
  const root = scratch.rootFor("akasha-warranting-")
  typeWorld(root)
  const beside = "akasha/thing/thing.module.notes.ts"
  standing(root, beside, "body\n")
  expect(pathsOf(root, beside)).toEqual([beside])
})

test("a file naming no page type in its name answers to no type", () => {
  const root = scratch.rootFor("akasha-warranting-")
  typeWorld(root)
  const loose = "akasha/thing/loose.ts"
  standing(root, loose, "body\n")
  expect(pathsOf(root, loose)).toEqual([loose])
})

test("a chain that turns back on itself is walked once", () => {
  const root = scratch.rootFor("akasha-warranting-")
  const one = pageType(root, "one", "two")
  const two = pageType(root, "two", "one")
  const at = "akasha/thing/thing.one.ts"
  standing(root, at, "body\n")
  expect(pathsOf(root, at)).toEqual([at, one, two])
})

test("a type whose page is not there warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-warranting-")
  const chain = typeWorld(root)
  standing(root, PATH, "one\n")
  rmSync(join(root, chain[0] ?? ""))
  expect(pathsOf(root, PATH)).toEqual([PATH])
})

test("a type not read is refused, and the refusal says the type is owed", () => {
  const root = scratch.rootFor("akasha-warranting-")
  typeWorld(root)
  const oid = standing(root, PATH, "one\n")
  recordRead(root, AGENT, { path: PATH, oid, seenAt: 1 })
  const said = unreadIn(root, AGENT, [PATH])
  expect(said.length).toBe(3)
  expect(said[0]).toContain(TYPE)
})

test("one reading of a type answers for every path of that type", () => {
  const root = scratch.rootFor("akasha-warranting-")
  const chain = typeWorld(root)
  const other = "akasha/thing/other.module.ts"
  for (const at of [PATH, other]) {
    recordRead(root, AGENT, { path: at, oid: standing(root, at, "one\n"), seenAt: 1 })
  }
  expect(unreadIn(root, AGENT, [PATH, other]).length).toBe(chain.length)
})
