import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { readingIn } from "@akasha/indexes"
import {
  idFiled,
  listedFiled,
  pathFiled,
  relationFiled,
  schemaFiled,
} from "@akasha/indexes/testing"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { keyingFor, respellingFor } from "./key-respelling.module.code.ts"

const KEYED = "01a058ed-0000-7000-8000-000000000001"

const HELD = "01a058ed-0000-7000-8000-000000000002"

const ONE = "01a058ed-0000-7000-8000-000000000003"

const PROPERTY_AT = "akasha/keyed.text-property.ts"

const TYPE_AT = "akasha/held.page-type.ts"

const PAGE_AT = "akasha/one.held.ts"

const CODE_AT = "akasha/reader.module.code.ts"

const BODIES: Record<string, string> = {
  [PROPERTY_AT]:
    'export const keyed = { id: "one", pageTypeSlug: "text-property", slug: "keyed",' +
    ' propertySlug: "keyed" }\n',
  [TYPE_AT]:
    "export type Held = { keyed: string }\n" +
    'export const held = { id: "two", pageTypeSlug: "page-type", slug: "held" }\n',
  [PAGE_AT]:
    'import type { Held } from "./held.page-type.ts"\n' +
    'export const one = { keyed: "said" } as const satisfies Held\n',
  [CODE_AT]:
    'import type { Held } from "./held.page-type.ts"\n' +
    "export function readOf(said: Held): string {\n  return said.keyed\n}\n",
}

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = scratch.rootFor("akasha-keying-")
  for (const [path, text] of Object.entries(BODIES)) {
    const at = join(root, path)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, text)
    pathFiled(root, path, [{ path, id: path }])
  }
  schemaFiled(root, "text-property", "keyed", [
    {
      pageTypeSlug: "text-property",
      targetPageTypeSlug: null,
      unique: null,
      slug: "keyed",
      propertySlug: "keyed",
      fileName: null,
    },
  ])
  listedFiled(root, "text-property", "keyed", [{ path: PROPERTY_AT, id: KEYED }])
  listedFiled(root, "page-type", "held", [{ path: TYPE_AT, id: HELD }])
  listedFiled(root, "held", "one", [{ path: PAGE_AT, id: ONE }])
  idFiled(root, HELD, [{ path: TYPE_AT, id: HELD }])
  relationFiled(root, KEYED, "page-property-slug", HELD, [{ path: TYPE_AT }])
  return root
}

function textOf(root: string): (path: string) => string | null {
  return (path) => {
    try {
      return readFileSync(join(root, path), "utf8")
    } catch {
      return null
    }
  }
}

test("a name reaching no page property is refused", () => {
  const root = rooted()
  const said = keyingFor(readingIn(root), "nowhere", "renamed")

  expect("refused" in said).toBe(true)
})

test("a key already standing as what it would become is refused", () => {
  const root = rooted()
  const said = keyingFor(readingIn(root), "text-property/keyed", "keyed")

  expect(said).toEqual({
    refused: "`text-property/keyed` already carries the key `keyed`, so there is nothing to rename",
  })
})

test("a key it becomes that is no slug is refused", () => {
  const root = rooted()
  const said = keyingFor(readingIn(root), "text-property/keyed", "Renamed")

  expect("refused" in said).toBe(true)
})

test("a property is reached by its address and answered with the key it carries", () => {
  const root = rooted()
  const said = keyingFor(readingIn(root), "text-property/keyed", "read-by")

  expect(said).toEqual({
    keying: {
      id: KEYED,
      path: PROPERTY_AT,
      named: "text-property/keyed",
      was: "keyed",
      now: "read-by",
      wasKey: "keyed",
      nowKey: "readBy",
    },
  })
})

test("the signature, the page stating it and the code reading it are all respelled", () => {
  const root = rooted()
  const given = readingIn(root)
  const asked = keyingFor(given, "text-property/keyed", "read-by")
  if ("refused" in asked) throw new Error(asked.refused)
  const made = respellingFor(root, given, asked.keying, textOf(root))
  if ("refused" in made) throw new Error(made.refused)

  expect(made.respelling.declarers).toEqual([TYPE_AT])
  expect(made.respelling.pages).toEqual([PAGE_AT])
  expect([...made.respelling.changes.keys()].sort()).toEqual(
    [PROPERTY_AT, TYPE_AT, PAGE_AT, CODE_AT].sort()
  )
  expect(made.respelling.changes.get(TYPE_AT)).toContain("{ readBy: string }")
  expect(made.respelling.changes.get(PAGE_AT)).toContain('readBy: "said"')
  expect(made.respelling.changes.get(CODE_AT)).toContain("said.readBy")
  expect(made.respelling.changes.get(PROPERTY_AT)).toContain('propertySlug: "read-by"')
})

test("the slug a property is reached by does not change when its key does", () => {
  const root = rooted()
  const given = readingIn(root)
  const asked = keyingFor(given, "text-property/keyed", "read-by")
  if ("refused" in asked) throw new Error(asked.refused)
  const made = respellingFor(root, given, asked.keying, textOf(root))
  if ("refused" in made) throw new Error(made.refused)

  expect(made.respelling.changes.get(PROPERTY_AT)).toContain('slug: "keyed"')
})
