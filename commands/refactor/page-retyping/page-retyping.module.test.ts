import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said as gitIn } from "@akasha/git/git-running"
import { rebuiltIn } from "@akasha/indexes/testing"
import { declaringUnder } from "@akasha/testing-system/declaring"
import { admitting } from "@akasha/testing-system/minting"
import { there } from "@akasha/testing-system/putting"
import type { Answer, Given } from "../../../command-system/calling/calling.module.code.ts"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { exportedFrom, retypeLanded, specifierFor } from "./page-retyping.module.code.ts"

const TREE = "akasha"

const AAAA = "01a04bed-1450-7000-8000-00000000aaaa"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const idOf = (said: string): string => `01a04bed-1450-7000-8000-0000000000${said}`

function stated(value: Readonly<Record<string, unknown>>): string {
  return `export const it = ${JSON.stringify(value, null, 2)} as const\n`
}

function kind(
  said: string,
  slug: string,
  above: string | null,
  declares: readonly string[] = []
): readonly [string, string] {
  return [
    `${TREE}/${slug}.page-type.ts`,
    stated({
      id: idOf(said),
      pageTypeSlug: "page-type",
      slug,
      extendsSlug: above,
      properties: declares.map((one) => ({ pagePropertySlug: one, required: false, many: false })),
    }),
  ]
}

function property(
  said: string,
  slug: string,
  pageTypeSlug: string,
  propertySlug: string,
  target: string | null = null
): readonly [string, string] {
  const held = target === null ? {} : { targetPageTypeSlug: target }
  return [
    `${TREE}/${slug}.${pageTypeSlug}.ts`,
    stated({ id: idOf(said), pageTypeSlug, slug, propertySlug, ...held }),
  ]
}

const VOCABULARY: Readonly<Record<string, string>> = {
  ...declaringUnder(TREE),
  ...Object.fromEntries([
    kind("01", "page", null, ["id", "slug", "page-type-slug"]),
    kind("02", "page-property", "page-type/page"),
    kind("03", "relation-property", "page-type/page-property"),
    kind("04", "file-property", "page-type/page-property"),
    kind("06", "page-type", "page-type/page"),
    kind("07", "thing", "page-type/page", ["names", "held-code", "only-thing"]),
    kind("08", "mark", "page-type/page", ["names", "mark-code"]),
    property("09", "page-type-slug", "relation-property", "page-type-slug", "page-type/page-type"),
    property("10", "names", "relation-property", "names", "page-type/page"),
    property("11", "held-code", "file-property", "code"),
    property("12", "mark-code", "file-property", "code"),
    property("13", "only-thing", "file-property", "extra"),
  ]),
}

const HELD = `${TREE}/one/held.thing.ts`

const HELD_AT = `${TREE}/one/held.mark.ts`

const CODE = `${TREE}/one/held.thing.code.ts`

const CODE_AT = `${TREE}/one/held.mark.code.ts`

const NOTE = `${TREE}/one/held.thing.note.txt`

const NOTE_AT = `${TREE}/one/held.mark.note.txt`

const NAMER = `${TREE}/six/alpha.thing.ts`

const EXTRA = `${TREE}/one/extra.thing.ts`

const MANIFEST = `${TREE}/one/package.json`

const KINDS = `${TREE}/package.json`

const PAGE = `import type { Thing } from "../thing.page-type.ts"

export const held = {
  id: "${AAAA}",
  pageTypeSlug: "thing",
  slug: "held",
  code: "ts",
} as const satisfies Thing
`

const RETYPED = `import type { Mark } from "@akasha/kinds/mark"

export const held = {
  id: "${AAAA}",
  pageTypeSlug: "mark",
  slug: "held",
  code: "ts",
} as const satisfies Mark
`

const BESIDE = `export const held = 1\n`

const NOTED = `what the page is for, carried as it is\n`

const NAMING = `import type { Thing } from "../thing.page-type.ts"

export const alpha = {
  id: "${idOf("21")}",
  pageTypeSlug: "thing",
  slug: "alpha",
  names: ["thing/held"],
} as const satisfies Thing
`

const STRAY = `import type { Thing } from "../thing.page-type.ts"

export const extra = {
  id: "${idOf("22")}",
  pageTypeSlug: "thing",
  slug: "extra",
  extra: "yes",
} as const satisfies Thing
`

const MANIFEST_BODY = `{
  "name": "@akasha/one",
  "exports": {
    "./held": "./held.thing.code.ts"
  }
}
`

const KINDS_BODY = `{
  "name": "@akasha/kinds",
  "exports": {
    "./mark": "./mark.page-type.ts",
    "./thing": "./thing.page-type.ts"
  }
}
`

const WORLD: Readonly<Record<string, string>> = {
  ...VOCABULARY,
  [HELD]: PAGE,
  [CODE]: BESIDE,
  [NOTE]: NOTED,
  [NAMER]: NAMING,
  [EXTRA]: STRAY,
  [MANIFEST]: MANIFEST_BODY,
  [KINDS]: KINDS_BODY,
}

function worldWith(): string {
  const root = scratch.rootFor("akasha-retype-")
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@nowhere"])
  gitIn(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(WORLD)) {
    const at = join(root, path)
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, body)
  }
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", "first"])
  writeFileSync(join(root, ".git/info/exclude"), "*.uncommitted.ts\n")
  rebuiltIn(root, TREE)
  admitting(root)
  return root
}

function givenIn(root: string): Given {
  return { root, calledAs: "akasha refactor retype", from: root, writer: null, agentId: null }
}

function bodyIn(root: string, path: string): string {
  return readFileSync(join(root, path), "utf8")
}

function told(said: Answer): string {
  return said.report.join("\n")
}

async function retyped(root: string, from: string, to: string, dry = false): Promise<Answer> {
  const argv = ["retype", "--from", from, "--to", to, ...(dry ? ["--dry-run"] : [])]
  return await retypeLanded(givenIn(root), root, from, to, dry, argv, [
    "--from",
    "--to",
    "--message",
    "--message-file",
    "--break-the-glass",
  ])
}

test("a page's own file arrives under the tail of the page type it becomes", async () => {
  const root = worldWith()
  const said = await retyped(root, "thing/held", "mark")
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(there(root, HELD)).toBe(false)
  expect(there(root, HELD_AT)).toBe(true)
})

test("every file beside the page arrives under that tail too", async () => {
  const root = worldWith()
  const said = await retyped(root, "thing/held", "mark")
  expect(said.refusals).toEqual([])
  expect(there(root, CODE)).toBe(false)
  expect(there(root, NOTE)).toBe(false)
  expect(there(root, CODE_AT)).toBe(true)
  expect(there(root, NOTE_AT)).toBe(true)
})

test("a body beside the page is carried byte for byte", async () => {
  const root = worldWith()
  const said = await retyped(root, "thing/held", "mark")
  expect(said.refusals).toEqual([])
  expect(bodyIn(root, NOTE_AT)).toBe(NOTED)
  expect(bodyIn(root, CODE_AT)).toBe(BESIDE)
})

test("the page's own body states the page type, the type and the import it becomes", async () => {
  const root = worldWith()
  const said = await retyped(root, "thing/held", "mark")
  expect(said.refusals).toEqual([])
  expect(bodyIn(root, HELD_AT)).toBe(RETYPED)
})

test("an address naming the page under its old page type is repointed", async () => {
  const root = worldWith()
  const said = await retyped(root, "thing/held", "mark")
  expect(said.refusals).toEqual([])
  expect(bodyIn(root, NAMER)).toContain('names: ["mark/held"]')
})

test("a package manifest exporting a file this carries is repointed", async () => {
  const root = worldWith()
  const said = await retyped(root, "thing/held", "mark")
  expect(said.refusals).toEqual([])
  expect(bodyIn(root, MANIFEST)).toContain('"./held": "./held.mark.code.ts"')
  expect(bodyIn(root, KINDS)).toBe(KINDS_BODY)
})

test("a dry run says what would happen and writes nothing", async () => {
  const root = worldWith()
  const was = gitIn(root, ["rev-parse", "HEAD"]).trim()
  const said = await retyped(root, "thing/held", "mark", true)
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(told(said)).toContain("`thing/held` would become `mark/held`")
  expect(told(said)).toContain(`  ${HELD} -> ${HELD_AT}`)
  expect(told(said)).toContain(`  ${NOTE} -> ${NOTE_AT}`)
  expect(there(root, HELD)).toBe(true)
  expect(there(root, HELD_AT)).toBe(false)
  expect(bodyIn(root, HELD)).toBe(PAGE)
  expect(bodyIn(root, MANIFEST)).toBe(MANIFEST_BODY)
  expect(gitIn(root, ["rev-parse", "HEAD"]).trim()).toBe(was)
})

test("a page the index does not carry is refused", async () => {
  const root = worldWith()
  const said = await retyped(root, "thing/nobody", "mark")
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe("no `thing` carries the slug `nobody`")
})

test("a slug naming no page type is refused", async () => {
  const root = worldWith()
  const said = await retyped(root, "held", "mark")
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("names no page type")
})

test("a page type the index does not carry is refused", async () => {
  const root = worldWith()
  const said = await retyped(root, "thing/held", "nowhere")
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe("no page type carries the slug `nowhere`")
})

test("a page already of the page type named is refused", async () => {
  const root = worldWith()
  const said = await retyped(root, "thing/held", "thing")
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is already a `thing`")
})

test("a key the page type it becomes reads no property by is refused and named", async () => {
  const root = worldWith()
  const said = await retyped(root, "thing/extra", "mark")
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("the page states `extra`")
  expect(said.refusals[0]).toContain("`mark` reads no property by that key")
  expect(said.refusals[0]).toContain("`only-thing`")
  expect(there(root, `${TREE}/one/extra.mark.ts`)).toBe(false)
})

test("a type in the page's own package is imported by a relative reach", () => {
  const held = new Map([["one/package.json", '{ "name": "@akasha/one" }']])
  const said = specifierFor(
    "one/held.thing.ts",
    "one/kinds/mark.page-type.ts",
    (at: string) => held.get(at) ?? null
  )
  expect(said).toEqual({ said: "./kinds/mark.page-type.ts" })
})

test("a type in another package is imported by the export naming it", () => {
  const held = new Map([
    ["one/package.json", '{ "name": "@akasha/one" }'],
    [
      "two/package.json",
      '{ "name": "@akasha/two", "exports": { "./mark": "./mark.page-type.ts" } }',
    ],
  ])
  const said = specifierFor(
    "one/held.thing.ts",
    "two/mark.page-type.ts",
    (at: string) => held.get(at) ?? null
  )
  expect(said).toEqual({ said: "@akasha/two/mark" })
})

test("a package exporting no path to that type refuses rather than guessing", () => {
  const held = {
    at: "two/package.json",
    folder: "two",
    text: '{ "name": "@akasha/two", "exports": { "./other": "./other.module.code.ts" } }',
  }
  const said = exportedFrom(held, "two/mark.page-type.ts")
  expect(said).toEqual({
    refused:
      "two/package.json exports no path naming two/mark.page-type.ts, so how to import it is unanswered",
  })
})
