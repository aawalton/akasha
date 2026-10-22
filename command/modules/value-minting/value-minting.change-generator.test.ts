import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type {
  Adding,
  FileChange,
  Replacing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { put } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import {
  baseOf,
  changeOf,
} from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import {
  arrivedAt,
  generateChange,
  identified,
  identifiedOver,
  mintedFor,
} from "akasha/command/modules/value-minting/value-minting.change-generator.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { said as gitIn } from "akasha/git/modules/running/git-running.module.code.ts"
import { statesVersionSeven } from "akasha/page/id/modules/uuid-version-7/uuid-version-7.module.code.ts"
import {
  relationFiled,
  shapeAdded,
} from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"
import { z } from "zod"

const ENTRY_SAID = z.record(z.string(), z.string())

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AT = "akasha/one.thing.ts"

const TYPE_AT = "akasha/widget.page-type.ts"

const WIDGET_AT = "akasha/one.widget.ts"

const HELD_ID = "01a0503f-14ea-74e4-9759-fe1f54a03d0d"

const TYPE_ID = "01a0503f-14ea-74e4-9759-fe1f54a03d0e"

const BODY =
  'import type { Thing } from "./thing.page-type.ts"\n\n' +
  'export const one = { type: "page-type/thing", slug: "one" } as const satisfies Thing\n'

const TYPE_BODY =
  `export const widget = { id: "${TYPE_ID}",` + ' type: "page-type/page-type", slug: "widget" }\n'

const WIDGET_BODY = 'export const one = { type: "page-type/widget", slug: "one" }\n'

const PAGE_TYPE_AT = "akasha/page-type.page-type.ts"

const PAGE_TYPE_BODY =
  `export const held = { id: "${TYPE_ID}", type: "page-type/page-type", slug: "page-type",` +
  ' extends: [], properties: [{ pagePropertySlug: "id", required: true, many: false },' +
  ' { pagePropertySlug: "slug", required: true, many: false }] }\n'

const IDS = new Map<string, string>()

function idFor(said: string): string {
  const found = IDS.get(said)
  if (found !== undefined) return found
  const made = `01a0503f-14ea-74e4-9759-${String(IDS.size + 100).padStart(12, "0")}`
  IDS.set(said, made)
  return made
}

function property(
  root: string,
  slug: string,
  generator: string | null,
  unique: string | null = null
): undefined {
  const said = generator === null ? "" : `, generator: "${generator}"`
  const at = `akasha/${slug}.text-property.ts`
  const id = idFor(`text-property/${slug}`)
  put(
    root,
    at,
    `export const held = { id: "${id}", type: "page-type/text-property",` +
      ` slug: "${slug}", propertySlug: "${slug}"${said} }\n`
  )
  shapeAdded(root, "text-property", slug, [
    { pageTypeSlug: "text-property", targetPageTypeSlug: null, unique, slug, propertySlug: slug },
  ])
  listedFiled(root, "text-property", slug, [{ path: at, id }])
  if (generator !== null) {
    relationFiled(root, idFor(`generator-kind/${generator}`), "generator", id, [{ path: at }])
  }
}

function kind(root: string, slug: string, afterChecks: boolean, everyChange = false): undefined {
  const at = `akasha/${slug}.generator-kind.ts`
  const id = idFor(`generator-kind/${slug}`)
  put(
    root,
    at,
    `export const kind = { id: "${id}", type: "page-type/generator-kind",` +
      ` slug: "${slug}", afterChecks: ${afterChecks}, everyChange: ${everyChange} }\n`
  )
  listedFiled(root, "generator-kind", slug, [{ path: at, id }])
  valueAlsoFiled(root, "generator-kind", [
    {
      path: at,
      value: { id, type: `${pageType.slug}/generator-kind`, slug, afterChecks, everyChange },
    },
  ])
}

function rooted(generator: string | null): string {
  const root = scratch.rootFor("akasha-minting-")
  mkdirSync(join(root, "akasha"), { recursive: true })
  writeFileSync(join(root, "seed"), "held\n")
  kind(root, "uuid-v7", false)
  kind(root, "held", true)
  property(root, "id", generator, "page")
  property(root, "slug", null, "page-type")
  listedFiled(root, "page-type", "thing", [{ path: "akasha/thing.page-type.ts", id: HELD_ID }])
  put(root, PAGE_TYPE_AT, PAGE_TYPE_BODY)
  listedFiled(root, "page-type", "page-type", [{ path: PAGE_TYPE_AT, id: TYPE_ID }])
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@akasha"])
  gitIn(root, ["config", "user.name", "held"])
  gitIn(root, ["add", "--", "seed", "akasha"])
  gitIn(root, ["commit", "--quiet", "-m", "held", "--", "seed", "akasha"])
  return root
}

function carrying(body: string): Adding {
  return { kind: "add", path: AT, content: body }
}

function mintingOnto(
  root: string,
  rows: readonly FileChange[]
): { readonly edits: readonly Replacing[]; readonly filled: readonly string[] } {
  const said = generateChange(changeOf(root, baseOf(root), rows))
  const edits = said.edits.filter((one): one is Replacing => one.kind === "replace")
  return { edits, filled: said.said }
}

const CREATED = "a page being created states none of its own"

function textOf(edits: readonly Replacing[], path: string = AT): string {
  return edits.find((one) => one.path === path)?.contentTo ?? ""
}

test("a kind nothing here works out is refused rather than left unfilled", () => {
  expect(() => mintedFor("held", "id")).toThrow("nothing here works that kind out")
})

test("a property stating no generator is worked out nowhere", () => {
  const root = rooted(null)
  expect(mintingOnto(root, [carrying(BODY)]).edits).toEqual([])
})

test("a property worked out after the checks is not worked out here", () => {
  const root = rooted("held")
  expect(mintingOnto(root, [carrying(BODY)]).edits).toEqual([])
  expect(mintingOnto(root, [carrying(BODY)]).filled).toEqual([])
})

test("a page being created is given the value it does not carry", () => {
  const root = rooted("uuid-v7")
  const said = mintingOnto(root, [carrying(BODY)])
  expect(said.filled).toEqual([`\`${AT}\` was given \`id\` — ${CREATED}`])
  expect(textOf(said.edits)).toMatch(/\{ id: "[0-9a-f-]{36}", type: "page-type\/thing"/)
})

test("a page of a page type landing in the same change is given the value it does not carry", () => {
  const root = rooted("uuid-v7")
  const said = mintingOnto(root, [
    { ...carrying(TYPE_BODY), path: TYPE_AT },
    { ...carrying(WIDGET_BODY), path: WIDGET_AT },
  ])
  expect(said.filled).toEqual([`\`${WIDGET_AT}\` was given \`id\` — ${CREATED}`])
  expect(textOf(said.edits, WIDGET_AT)).toMatch(/\{ id: "[0-9a-f-]{36}", type: "page-type\/widget"/)
})

test("the change generator gives a page being created its value and says so", () => {
  const root = rooted("uuid-v7")
  const said = generateChange(changeOf(root, baseOf(root), [carrying(BODY)]))
  expect(said.said).toEqual([
    `\`${AT}\` was given \`id\` — a page being created states none of its own`,
  ])
  expect(said.edits.map((one) => ("path" in one ? one.path : null))).toEqual([AT])
})

test("a page carrying the value already keeps the one it carries", () => {
  const root = rooted("uuid-v7")
  const body = BODY.replace("one = { ", `one = { id: "${HELD_ID}", `)
  const said = mintingOnto(root, [carrying(body)])
  expect(said.filled).toEqual([])
  expect(said.edits).toEqual([])
})

test("a path naming no page takes no value", () => {
  const root = rooted("uuid-v7")
  const said = mintingOnto(root, [{ kind: "add", path: "akasha/one.ts", content: BODY }])
  expect(said.filled).toEqual([])
})

test("a page already committed keeps the value it was given", () => {
  const root = rooted("uuid-v7")
  put(root, AT, BODY)
  gitIn(root, ["add", "--", AT])
  gitIn(root, ["commit", "--quiet", "-m", "stood", "--", AT])
  const said = mintingOnto(root, [carrying(BODY.replace("one", "two"))])
  expect(said.filled).toEqual([])
})

test("a path taken away takes no value", () => {
  const root = rooted("uuid-v7")
  const said = mintingOnto(root, [{ kind: "remove", path: AT }])
  expect(said.filled).toEqual([])
  expect(said.edits).toEqual([])
})

test("an entry arriving without an id is given one, and the id goes in first", () => {
  const held = ENTRY_SAID.parse(JSON.parse(identified('{"page": "one"}') ?? "{}"))
  expect(Object.keys(held)).toEqual(["id", "page"])
  expect(statesVersionSeven(String(held["id"]))).toBe(true)
})

test("an entry already carrying an id is left alone", () => {
  expect(identified(`{"id": "${HELD_ID}", "page": "one"}`)).toBeNull()
})

test("a line carrying no object is left alone", () => {
  expect(identified("")).toBeNull()
  expect(identified("   ")).toBeNull()
  expect(identified("[1]")).toBeNull()
  expect(identified("what is no json at all")).toBeNull()
})

test("only the entries arriving without an id are given one", () => {
  const said = identifiedOver(`{"page": "one"}\n{"id": "${HELD_ID}", "page": "two"}\n`)
  const lines = (said ?? "").split("\n")
  expect(ENTRY_SAID.parse(JSON.parse(lines[0] ?? "{}"))["page"]).toBe("one")
  expect(ENTRY_SAID.parse(JSON.parse(lines[1] ?? "{}"))["id"]).toBe(HELD_ID)
  expect(lines[2]).toBe("")
})

test("a file whose entries all carry an id is left alone", () => {
  expect(identifiedOver(`{"id": "${HELD_ID}", "page": "one"}\n`)).toBeNull()
})

test("a file grown at its end has only its new lines read", () => {
  const was = '{"page": "one"}\n'
  const now = `${was}{"page": "two"}\n`
  expect(identifiedOver(now, arrivedAt(now, was))?.startsWith(was)).toBe(true)
  expect(arrivedAt(now, '{"page": "zero"}\n')).toBe(0)
})

const INSTANT = /"\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z"/

const CHANGED = "a page whose committed values changed states when they did"

const ONCE = "2020-01-01T00:00:00.000Z"

const STAMPED =
  'import type { Thing } from "./thing.page-type.ts"\n\n' +
  `export const one = { id: "${HELD_ID}", type: "page-type/thing", slug: "one",` +
  ` createdAt: "${ONCE}", updatedAt: "${ONCE}" } as const satisfies Thing\n`

function stamping(): string {
  const root = rooted("uuid-v7")
  kind(root, "created-instant", false)
  kind(root, "changed-instant", false, true)
  property(root, "created-at", "created-instant")
  property(root, "updated-at", "changed-instant")
  return root
}

function committed(root: string, at: string, body: string): undefined {
  put(root, at, body)
  gitIn(root, ["add", "--", at])
  gitIn(root, ["commit", "--quiet", "-m", "landed", "--", at])
}

function stampOf(text: string, key: string): string {
  return new RegExp(`${key}: ("[^"]*")`).exec(text)?.[1] ?? ""
}

test("a page being created is given the moment it was created, last in the page", () => {
  const said = mintingOnto(stamping(), [carrying(BODY)])
  const text = textOf(said.edits)
  expect(said.filled).toEqual([
    `\`${AT}\` was given \`createdAt\`, \`id\`, \`updatedAt\` — ${CREATED}`,
  ])
  expect(text).toMatch(
    /id: "[0-9a-f-]{36}",\s+type: "page-type\/thing",\s+slug: "one",\s+createdAt: /
  )
  expect(stampOf(text, "createdAt")).toMatch(INSTANT)
  expect(stampOf(text, "updatedAt")).toBe(stampOf(text, "createdAt"))
})

test("a page whose committed values change is given the moment they changed", () => {
  const root = stamping()
  committed(root, AT, STAMPED)
  const said = mintingOnto(root, [carrying(STAMPED.replace('slug: "one"', 'slug: "two"'))])
  const text = textOf(said.edits)
  expect(said.filled).toEqual([`\`${AT}\` was given \`updatedAt\` — ${CHANGED}`])
  expect(stampOf(text, "updatedAt")).toMatch(INSTANT)
  expect(stampOf(text, "updatedAt")).not.toBe(`"${ONCE}"`)
  expect(stampOf(text, "createdAt")).toBe(`"${ONCE}"`)
})

test("a page whose committed values are as they were keeps the moment it states", () => {
  const root = stamping()
  committed(root, AT, STAMPED)
  const said = mintingOnto(root, [carrying(STAMPED.replace("{ id", "{\n  id"))])
  expect(said.filled).toEqual([])
})

test("a change stating the moment itself keeps the moment it states", () => {
  const root = stamping()
  committed(root, AT, STAMPED)
  const moved = STAMPED.replace(`updatedAt: "${ONCE}"`, 'updatedAt: "2021-01-01T00:00:00.000Z"')
  const said = mintingOnto(root, [carrying(moved.replace('slug: "one"', 'slug: "two"'))])
  expect(said.filled).toEqual([])
})

test("a page committed with no moment is given one as its values change", () => {
  const root = stamping()
  const bare = STAMPED.replace(`, createdAt: "${ONCE}", updatedAt: "${ONCE}"`, "")
  committed(root, AT, bare)
  const said = mintingOnto(root, [carrying(bare.replace('slug: "one"', 'slug: "two"'))])
  expect(said.filled).toEqual([`\`${AT}\` was given \`updatedAt\` — ${CHANGED}`])
  expect(stampOf(textOf(said.edits), "createdAt")).toBe("")
})

const DROPPED = STAMPED.replace(`, createdAt: "${ONCE}", updatedAt: "${ONCE}"`, "")

test("a page written over without its moments keeps both where its values are as they were", () => {
  const root = stamping()
  committed(root, AT, STAMPED)
  const text = textOf(mintingOnto(root, [carrying(DROPPED)]).edits)
  expect(stampOf(text, "createdAt")).toBe(`"${ONCE}"`)
  expect(stampOf(text, "updatedAt")).toBe(`"${ONCE}"`)
})

test("a page written over without its moments and with new values keeps when it was created", () => {
  const root = stamping()
  committed(root, AT, STAMPED)
  const said = mintingOnto(root, [carrying(DROPPED.replace('slug: "one"', 'slug: "two"'))])
  const text = textOf(said.edits)
  expect(stampOf(text, "createdAt")).toBe(`"${ONCE}"`)
  expect(stampOf(text, "updatedAt")).not.toBe(`"${ONCE}"`)
  expect(stampOf(text, "updatedAt")).toMatch(INSTANT)
})

test("a page moved with its values changed is given the moment they changed", () => {
  const root = stamping()
  committed(root, AT, STAMPED)
  const to = "akasha/two.thing.ts"
  const said = mintingOnto(root, [
    { kind: "remove", path: AT },
    { kind: "add", path: to, content: STAMPED.replace('slug: "one"', 'slug: "two"') },
  ])
  expect(said.filled).toEqual([`\`${to}\` was given \`updatedAt\` — ${CHANGED}`])
  expect(stampOf(textOf(said.edits, to), "createdAt")).toBe(`"${ONCE}"`)
})

test("a page moved with its values as they were keeps both moments", () => {
  const root = stamping()
  committed(root, AT, STAMPED)
  const said = mintingOnto(root, [
    { kind: "remove", path: AT },
    { kind: "add", path: "akasha/elsewhere/one.thing.ts", content: STAMPED },
  ])
  expect(said.filled).toEqual([])
})

test("a change to a file beside the page alone leaves the page as it is", () => {
  const root = stamping()
  committed(root, AT, STAMPED)
  const said = mintingOnto(root, [
    { kind: "add", path: "akasha/one.thing.notes.uncommitted.jsonl", content: '{"id": "a"}\n' },
  ])
  expect(said.filled).toEqual([])
})
