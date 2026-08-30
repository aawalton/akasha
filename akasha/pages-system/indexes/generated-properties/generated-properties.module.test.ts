import { afterAll, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { put } from "../../../testing-system/putting/putting.module.code.ts"
import { indexIn } from "../index-reading/index-reading.module.code.ts"
import { type Patch, shadowAt, shadowOver } from "../index-shadow/index-shadow.module.code.ts"
import { generatedProperties } from "./generated-properties.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const ID = "01a04f2b-0000-7000-8000-00000000000a"

const SHAPE = "text-property"

function filed(root: string, at: string, said: Record<string, unknown>): undefined {
  put(indexIn(root), at, `${JSON.stringify(said)}\n`)
}

function standing(root: string, slug: string, said: string): undefined {
  const at = `akasha/${slug}.${SHAPE}.ts`
  put(
    root,
    at,
    `export const held = { id: "${ID}", pageTypeSlug: "${SHAPE}", slug: "${slug}"${said} }\n`
  )
  filed(root, `identity/${SHAPE}/slug/${slug}.jsonl`, { path: at, id: ID })
}

function named(root: string, slug: string, unique: string | null = null): undefined {
  filed(root, `schema/page-property/slug/${slug}.jsonl`, {
    pageTypeSlug: SHAPE,
    targetPageTypeSlug: null,
    unique,
  })
}

const HELD_AT = `akasha/held.${SHAPE}.ts`

function heldBody(said: string): string {
  return `export const held = { id: "${ID}", pageTypeSlug: "${SHAPE}", slug: "held"${said} }\n`
}

function patchOver(root: string, changes: ReadonlyMap<string, string | null>): Patch {
  const was = (path: string): Uint8Array | null => {
    try {
      return readFileSync(join(root, path))
    } catch {
      return null
    }
  }
  return {
    root,
    changed: [...changes.keys()].sort(),
    at: (path) => {
      if (!changes.has(path)) return was(path)
      const body = changes.get(path) ?? null
      return body === null ? null : new TextEncoder().encode(body)
    },
    was,
  }
}

function overOne(root: string, body: string | null): ReadonlySet<string> {
  const cast = shadowOver(patchOver(root, new Map([[HELD_AT, body]])))
  if ("refused" in cast) throw new Error(cast.refused)
  return generatedProperties(cast.shadow)
}

function rooted(): string {
  return scratch.rootFor("akasha-generated-")
}

test("an index naming no property answers no generated property", () => {
  expect([...generatedProperties(shadowAt(rooted()))]).toEqual([])
})

test("a property stating a generator is answered by its slug", () => {
  const root = rooted()
  named(root, "held")
  standing(root, "held", ', generator: "uuid-v7"')
  expect([...generatedProperties(shadowAt(root))]).toEqual(["held"])
})

test("a property stating no generator is not answered, so the set is what pages say", () => {
  const root = rooted()
  named(root, "held")
  standing(root, "held", "")
  expect([...generatedProperties(shadowAt(root))]).toEqual([])
})

test("a property stating `generator` as nothing states no generator", () => {
  const root = rooted()
  named(root, "held")
  standing(root, "held", ", generator: null")
  expect([...generatedProperties(shadowAt(root))]).toEqual([])
})

test("a property page the index does not name is not read, so the index is what answers", () => {
  const root = rooted()
  standing(root, "held", ', generator: "uuid-v7"')
  expect([...generatedProperties(shadowAt(root))]).toEqual([])
})

test("a property the index names and no page stands for answers nothing rather than throwing", () => {
  const root = rooted()
  named(root, "held")
  expect([...generatedProperties(shadowAt(root))]).toEqual([])
})

test("the slugs come back in one order, whatever order the index answers them in", () => {
  const root = rooted()
  for (const slug of ["beta", "alpha"]) {
    named(root, slug)
    standing(root, slug, ', generator: "uuid-v7"')
  }
  expect([...generatedProperties(shadowAt(root))]).toEqual(["alpha", "beta"])
})

test("a third property taking a generator is answered with no code changed here", () => {
  const root = rooted()
  for (const slug of ["one", "two", "three"]) {
    named(root, slug)
    standing(root, slug, ', generator: "next-seq"')
  }
  expect([...generatedProperties(shadowAt(root))]).toEqual(["one", "three", "two"])
})

test("a generator a change declares is answered while that change is being judged", () => {
  const root = rooted()
  named(root, "slug", "page-type")
  named(root, "held")
  standing(root, "held", "")
  expect([...generatedProperties(shadowAt(root))]).toEqual([])
  expect([...overOne(root, heldBody(', generator: "uuid-v7"'))]).toEqual(["held"])
})

test("a property declared and leaned on in one change is answered, so the two land together", () => {
  const root = rooted()
  named(root, "slug", "page-type")
  expect([...generatedProperties(shadowAt(root))]).toEqual([])
  expect([...overOne(root, heldBody(', generator: "uuid-v7"'))]).toEqual(["held"])
})

test("a generator a change takes away stops being answered while that change is judged", () => {
  const root = rooted()
  named(root, "slug", "page-type")
  named(root, "held")
  standing(root, "held", ', generator: "uuid-v7"')
  expect([...generatedProperties(shadowAt(root))]).toEqual(["held"])
  expect([...overOne(root, heldBody(""))]).toEqual([])
})

test("a property page a change takes away is answered by nothing", () => {
  const root = rooted()
  named(root, "slug", "page-type")
  named(root, "held")
  standing(root, "held", ', generator: "uuid-v7"')
  expect([...overOne(root, null)]).toEqual([])
})
