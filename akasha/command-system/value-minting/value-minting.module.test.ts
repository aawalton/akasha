import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { indexIn } from "../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { gitIn } from "../../testing-system/gitting/gitting.module.code.ts"
import { put } from "../../testing-system/putting/putting.module.code.ts"
import type { FileEdit } from "../landing/landing.module.code.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import {
  earlyIn,
  insertedInto,
  mintedFor,
  mintingOnto,
  uuidVersion7,
} from "./value-minting.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AT = "akasha/one.thing.ts"

const TYPE_AT = "akasha/widget.page-type.ts"

const WIDGET_AT = "akasha/one.widget.ts"

const HELD_ID = "01a0503f-14ea-74e4-9759-fe1f54a03d0d"

const TYPE_ID = "01a0503f-14ea-74e4-9759-fe1f54a03d0e"

const SHAPE = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

const BODY =
  'import type { Thing } from "./thing.page-type.ts"\n\n' +
  'export const one = { pageTypeSlug: "thing", slug: "one" } as const satisfies Thing\n'

const TYPE_BODY =
  `export const widget = { id: "${TYPE_ID}",` + ' pageTypeSlug: "page-type", slug: "widget" }\n'

const WIDGET_BODY = 'export const one = { pageTypeSlug: "widget", slug: "one" }\n'

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
  kind(root, "held", true)
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

function carrying(body: string): FileEdit {
  return { path: AT, body: new TextEncoder().encode(body) }
}

function textOf(changes: readonly FileEdit[], path: string = AT): string {
  const found = changes.find((one) => one.path === path)
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
  expect(() => mintedFor("held", "id")).toThrow("nothing here works that kind out")
})

test("a property stating no generator is worked out nowhere", () => {
  const root = rooted(null)
  expect([...earlyIn(root, [carrying(BODY)])]).toEqual([])
  expect(textOf(mintingOnto(root, [carrying(BODY)]).changes)).toBe(BODY)
})

test("a property worked out after the checks is not worked out here", () => {
  const root = rooted("held")
  expect([...earlyIn(root, [carrying(BODY)])]).toEqual([])
})

test("a page being created is given the value it does not carry", () => {
  const root = rooted("uuid-v7")
  expect([...earlyIn(root, [carrying(BODY)])]).toEqual([["id", "uuid-v7"]])
  const said = mintingOnto(root, [carrying(BODY)])
  expect(said.filled).toEqual([{ path: AT, keys: ["id"] }])
  expect(textOf(said.changes)).toMatch(/\{ id: "[0-9a-f-]{36}", pageTypeSlug: "thing"/)
})

test("a page of a page type landing in the same change is given the value it does not carry", () => {
  const root = rooted("uuid-v7")
  const said = mintingOnto(root, [
    { ...carrying(TYPE_BODY), path: TYPE_AT },
    { ...carrying(WIDGET_BODY), path: WIDGET_AT },
  ])
  expect(said.filled).toEqual([{ path: WIDGET_AT, keys: ["id"] }])
  expect(textOf(said.changes, WIDGET_AT)).toMatch(/\{ id: "[0-9a-f-]{36}", pageTypeSlug: "widget"/)
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
