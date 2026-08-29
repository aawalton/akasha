import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "../../command-system/scratching.module.code.ts"
import { put } from "../../testing-system/putting.module.code.ts"
import { generatedProperties } from "./generated-properties.module.code.ts"
import { indexIn } from "./index-reading.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const ID = "01a04f2b-0000-7000-8000-00000000000a"

const SHAPE = "text-property"

function filed(root: string, at: string, said: Record<string, unknown>): void {
  put(indexIn(root), at, `${JSON.stringify(said)}\n`)
}

function standing(root: string, slug: string, said: string): void {
  const at = `akasha/${slug}.${SHAPE}.ts`
  put(
    root,
    at,
    `export const held = { id: "${ID}", pageTypeSlug: "${SHAPE}", slug: "${slug}"${said} }\n`
  )
  filed(root, `identity/${SHAPE}/slug/${slug}.jsonl`, { path: at, id: ID })
}

function named(root: string, slug: string): void {
  filed(root, `schema/page-property/slug/${slug}.jsonl`, {
    pageTypeSlug: SHAPE,
    targetPageTypeSlug: null,
    unique: null,
  })
}

function rooted(): string {
  return scratch.rootFor("akasha-generated-")
}

test("an index naming no property answers no generated property", () => {
  expect([...generatedProperties(rooted())]).toEqual([])
})

test("a property stating a generator is answered by its slug", () => {
  const root = rooted()
  named(root, "held")
  standing(root, "held", ', generator: "uuid-v7"')
  expect([...generatedProperties(root)]).toEqual(["held"])
})

test("a property stating no generator is not answered, so the set is what pages say", () => {
  const root = rooted()
  named(root, "held")
  standing(root, "held", "")
  expect([...generatedProperties(root)]).toEqual([])
})

test("a property stating `generator` as nothing states no generator", () => {
  const root = rooted()
  named(root, "held")
  standing(root, "held", ", generator: null")
  expect([...generatedProperties(root)]).toEqual([])
})

test("a property page the index does not name is not read, so the index is what answers", () => {
  const root = rooted()
  standing(root, "held", ', generator: "uuid-v7"')
  expect([...generatedProperties(root)]).toEqual([])
})

test("a property the index names and no page stands for answers nothing rather than throwing", () => {
  const root = rooted()
  named(root, "held")
  expect([...generatedProperties(root)]).toEqual([])
})

test("the slugs come back in one order, whatever order the index answers them in", () => {
  const root = rooted()
  for (const slug of ["beta", "alpha"]) {
    named(root, slug)
    standing(root, slug, ', generator: "uuid-v7"')
  }
  expect([...generatedProperties(root)]).toEqual(["alpha", "beta"])
})

test("a third property taking a generator is answered with no code changed here", () => {
  const root = rooted()
  for (const slug of ["one", "two", "three"]) {
    named(root, slug)
    standing(root, slug, ', generator: "next-seq"')
  }
  expect([...generatedProperties(root)]).toEqual(["one", "three", "two"])
})
