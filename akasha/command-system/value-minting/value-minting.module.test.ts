import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Leaving } from "../../checks-system/judging/judging.module.code.ts"
import { indexIn } from "../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { gitIn } from "../../testing-system/gitting/gitting.module.code.ts"
import { put } from "../../testing-system/putting/putting.module.code.ts"
import type { Change } from "../landing/landing.module.code.ts"
import { baseOf, leavingOf } from "../landing/landing.module.code.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import {
  countingOnto,
  earlyIn,
  insertedInto,
  mintedFor,
  mintingOnto,
  numberedIn,
  uuidVersion7,
} from "./value-minting.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AT = "akasha/one.thing.ts"

const HELD_ID = "01a0503f-14ea-74e4-9759-fe1f54a03d0d"

const SHAPE = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

const BODY =
  'import type { Thing } from "./thing.page-type.ts"\n\n' +
  'export const one = { pageTypeSlug: "thing", slug: "one" } as const satisfies Thing\n'

function property(
  root: string,
  slug: string,
  generator: string | null,
  unique: string | null = null
): undefined {
  const said = generator === null ? "" : `, generator: "${generator}"`
  put(
    root,
    `akasha/${slug}.text-property.ts`,
    `export const held = { id: "${HELD_ID}", pageTypeSlug: "text-property",` +
      ` slug: "${slug}"${said} }\n`
  )
  put(
    indexIn(root),
    `schema/page-property/text-property/slug/${slug}.jsonl`,
    `{"pageTypeSlug":"text-property","targetPageTypeSlug":null,` +
      `"unique":${JSON.stringify(unique)},"slug":"${slug}","propertySlug":"${slug}"}\n`
  )
  put(
    indexIn(root),
    `identity/text-property/slug/${slug}.jsonl`,
    `{"path":"akasha/${slug}.text-property.ts","id":"${HELD_ID}"}\n`
  )
}

function kind(root: string, slug: string, afterChecks: boolean): undefined {
  put(
    root,
    `akasha/${slug}.generator-kind.ts`,
    `export const kind = { id: "${HELD_ID}", pageTypeSlug: "generator-kind",` +
      ` slug: "${slug}", afterChecks: ${afterChecks} }\n`
  )
  put(
    indexIn(root),
    `identity/generator-kind/slug/${slug}.jsonl`,
    `{"path":"akasha/${slug}.generator-kind.ts","id":"${HELD_ID}"}\n`
  )
}

function rooted(generator: string | null): string {
  const root = scratch.rootFor("akasha-minting-")
  mkdirSync(join(root, "akasha"), { recursive: true })
  writeFileSync(join(root, "seed"), "held\n")
  property(root, "id", generator, "always")
  property(root, "slug", null, "page-type")
  kind(root, "uuid-v7", false)
  kind(root, "next-seq", true)
  put(
    indexIn(root),
    "identity/page-type/slug/thing.jsonl",
    `{"path":"akasha/thing.page-type.ts","id":"${HELD_ID}"}\n`
  )
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@akasha"])
  gitIn(root, ["config", "user.name", "held"])
  gitIn(root, ["add", "--", "seed"])
  gitIn(root, ["commit", "--quiet", "-m", "held", "--", "seed"])
  return root
}

function carrying(body: string): Change {
  return { path: AT, body: new TextEncoder().encode(body) }
}

function textOf(changes: readonly Change[]): string {
  const found = changes.find((one) => one.path === AT)
  return found?.body === null || found?.body === undefined
    ? ""
    : new TextDecoder().decode(found.body)
}

test("a uuid version 7 carries its version, its variant and the time it was worked out", () => {
  const said = uuidVersion7(0x0123456789ab)
  expect(said).toMatch(SHAPE)
  expect(said.slice(0, 15)).toBe("01234567-89ab-7")
})

test("two worked out in the same millisecond are still two", () => {
  const at = Date.now()
  expect(uuidVersion7(at)).not.toBe(uuidVersion7(at))
})

test("a value goes in first in the literal, and the rest of the body stands", () => {
  const said = insertedInto(AT, BODY, "id", '"held"') ?? ""
  expect(said).toContain('{ id: "held", pageTypeSlug: "thing"')
  expect(said.split("\n").length).toBe(BODY.split("\n").length)
})

test("a body declaring no literal takes no value", () => {
  expect(insertedInto(AT, "export const one = 1\n", "id", '"held"')).toBe(null)
})

test("a kind nothing here works out is refused rather than left unfilled", () => {
  expect(() => mintedFor("next-seq", "seq")).toThrow("nothing here works that kind out")
})

test("a property stating no generator is worked out nowhere", () => {
  const root = rooted(null)
  expect([...earlyIn(root, [carrying(BODY)])]).toEqual([])
  expect(textOf(mintingOnto(root, [carrying(BODY)]).changes)).toBe(BODY)
})

test("a property worked out after the checks is not worked out here", () => {
  const root = rooted("next-seq")
  expect([...earlyIn(root, [carrying(BODY)])]).toEqual([])
})

test("a page being created is given the value it does not carry", () => {
  const root = rooted("uuid-v7")
  expect([...earlyIn(root, [carrying(BODY)])]).toEqual([["id", "uuid-v7"]])
  const said = mintingOnto(root, [carrying(BODY)])
  expect(said.filled).toEqual([{ path: AT, keys: ["id"] }])
  expect(textOf(said.changes)).toMatch(/\{ id: "[0-9a-f-]{36}", pageTypeSlug: "thing"/)
})

test("a page carrying the value already keeps the one it carries", () => {
  const root = rooted("uuid-v7")
  const body = BODY.replace("{ ", `{ id: "${HELD_ID}", `)
  const said = mintingOnto(root, [carrying(body)])
  expect(said.filled).toEqual([])
  expect(textOf(said.changes)).toBe(body)
})

test("a body carried from another path is left as it stands", () => {
  const root = rooted("uuid-v7")
  const said = mintingOnto(root, [{ ...carrying(BODY), carried: true }])
  expect(said.filled).toEqual([])
  expect(textOf(said.changes)).toBe(BODY)
})

test("a path naming no page takes no value", () => {
  const root = rooted("uuid-v7")
  const said = mintingOnto(root, [{ path: "akasha/one.ts", body: new TextEncoder().encode(BODY) }])
  expect(said.filled).toEqual([])
})

test("a page already standing keeps the value it was given", () => {
  const root = rooted("uuid-v7")
  put(root, AT, BODY)
  gitIn(root, ["add", "--", AT])
  gitIn(root, ["commit", "--quiet", "-m", "stood", "--", AT])
  const said = mintingOnto(root, [carrying(BODY.replace("one", "two"))])
  expect(said.filled).toEqual([])
})

test("a path taken away takes no value", () => {
  const root = rooted("uuid-v7")
  const said = mintingOnto(root, [{ path: AT, body: null }])
  expect(said.filled).toEqual([])
  expect(said.changes).toEqual([{ path: AT, body: null }])
})

const TYPE_AT = "akasha/thing.page-type.ts"

function typed(root: string, count: number | null): undefined {
  const counted = count === null ? "" : `, nextSeq: ${count}`
  put(
    root,
    TYPE_AT,
    `export const thing = { id: "${HELD_ID}", pageTypeSlug: "page-type", slug: "thing"` +
      `${counted} }\n`
  )
}

function committed(root: string): string {
  gitIn(root, ["add", "--", "akasha"])
  gitIn(root, ["commit", "--quiet", "-m", "stood", "--", "akasha"])
  return root
}

function counting(): string {
  const root = rooted("uuid-v7")
  property(root, "seq", "next-seq", "page-type")
  typed(root, 1)
  return committed(root)
}

function over(root: string, changes: readonly Change[]): readonly Change[] {
  const leaving: Leaving = leavingOf(root, { base: baseOf(root), changed: changes })
  return countingOnto(leaving, changes)
}

function bodyAt(changes: readonly Change[], path: string): string {
  const found = changes.find((one) => one.path === path)
  return found === undefined || found.body === null ? "" : new TextDecoder().decode(found.body)
}

test("a number already stated is written over where it stands, and nothing else moves", () => {
  const said = numberedIn(
    TYPE_AT,
    'export const thing = { slug: "t", nextSeq: 4 }\n',
    "nextSeq",
    "9"
  )
  expect(said).toBe('export const thing = { slug: "t", nextSeq: 9 }\n')
})

test("a key the body does not state is written over nowhere", () => {
  expect(numberedIn(TYPE_AT, 'export const thing = { slug: "t" }\n', "nextSeq", "9")).toBe(null)
})

test("a page being created takes the number its page type holds, and the count rises", () => {
  const root = counting()
  const said = over(root, [carrying(BODY)])
  expect(bodyAt(said, AT)).toContain("seq: 1")
  expect(bodyAt(said, TYPE_AT)).toContain("nextSeq: 2")
})

test("two pages of one type take two numbers, and the count rises by two", () => {
  const root = counting()
  const other = "akasha/two.thing.ts"
  const said = over(root, [
    carrying(BODY),
    { path: other, body: new TextEncoder().encode(BODY.replace("one", "two")) },
  ])
  expect(bodyAt(said, AT)).toContain("seq: 1")
  expect(bodyAt(said, other)).toContain("seq: 2")
  expect(bodyAt(said, TYPE_AT)).toContain("nextSeq: 3")
})

test("a page type holding no count hands out nothing, and its pages are left as they stand", () => {
  const root = rooted("uuid-v7")
  property(root, "seq", "next-seq", "page-type")
  typed(root, null)
  committed(root)
  const said = over(root, [carrying(BODY)])
  expect(said).toHaveLength(1)
  expect(bodyAt(said, AT)).toBe(BODY)
})

test("a page stating its own number keeps it, and the count does not move", () => {
  const root = counting()
  const said = over(root, [carrying(BODY.replace("{ ", "{ seq: 7, "))])
  expect(said).toHaveLength(1)
  expect(bodyAt(said, AT)).toContain("seq: 7")
})

test("a body carried from another path takes no number", () => {
  const root = counting()
  const said = over(root, [{ ...carrying(BODY), carried: true }])
  expect(said).toHaveLength(1)
})

test("a page already standing takes no number", () => {
  const root = counting()
  put(root, AT, BODY)
  gitIn(root, ["add", "--", AT])
  gitIn(root, ["commit", "--quiet", "-m", "stood", "--", AT])
  expect(over(root, [carrying(BODY.replace("one", "two"))])).toHaveLength(1)
})

test("nothing counts where no property names `next-seq`, and the changes come back as they were", () => {
  const root = rooted("uuid-v7")
  typed(root, 1)
  committed(root)
  const changes = [carrying(BODY)]
  expect(over(root, changes)).toBe(changes)
})
