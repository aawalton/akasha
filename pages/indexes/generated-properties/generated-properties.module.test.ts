import { afterAll, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { valueAlsoFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import {
  generatedProperties,
  waitingKeys,
  waitingProperties,
} from "akasha/pages/indexes/generated-properties/generated-properties.module.code.ts"
import {
  relationFiled,
  shapeAdded,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { indexIn } from "akasha/pages/indexes/surface/index-surface.module.code.ts"
import { shadowAt, shadowFor } from "akasha/pages/shadow/shadow.module.code.ts"
import { put, there } from "akasha/testing-system/putting/putting.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const SHAPE = "text-property"

const KIND = "generator-kind"

const GENERATOR = "generator"

const RELATION = "relation-property"

const IDS = new Map<string, string>()

function idFor(said: string): string {
  const found = IDS.get(said)
  if (found !== undefined) return found
  const made = `01a04f2b-0000-7000-8000-${String(IDS.size + 10).padStart(12, "0")}`
  IDS.set(said, made)
  return made
}

function filed(root: string, at: string, said: Record<string, unknown>): undefined {
  put(indexIn(root), at, `${JSON.stringify(said)}\n`)
}

function edged(root: string, slug: string, generator: string): undefined {
  relationFiled(root, idFor(`${KIND}/${generator}`), GENERATOR, idFor(`${SHAPE}/${slug}`), [
    { path: `akasha/${slug}.${SHAPE}.ts` },
  ])
}

function property(
  root: string,
  slug: string,
  generator: string | null,
  propertySlug: string = slug,
  said: string = generator === null ? "" : `, generator: "${generator}"`
): undefined {
  const at = `akasha/${slug}.${SHAPE}.ts`
  const id = idFor(`${SHAPE}/${slug}`)
  put(
    root,
    at,
    `export const held = { id: "${id}", pageTypeSlug: "${SHAPE}", slug: "${slug}", propertySlug: "${propertySlug}"${said} }\n`
  )
  filed(root, `identity/page-type/${SHAPE}/slug/${slug}.jsonl`, { path: at, id })
  if (generator !== null) edged(root, slug, generator)
}

function kind(root: string, slug: string, afterChecks: boolean): undefined {
  const at = `akasha/${slug}.${KIND}.ts`
  const id = idFor(`${KIND}/${slug}`)
  put(
    root,
    at,
    `export const held = { id: "${id}", pageTypeSlug: "${KIND}", slug: "${slug}", afterChecks: ${afterChecks} }\n`
  )
  filed(root, `identity/page-type/${KIND}/slug/${slug}.jsonl`, { path: at, id })
  valueAlsoFiled(root, KIND, [{ path: at, value: { id, pageTypeSlug: KIND, slug, afterChecks } }])
}

function typed(
  root: string,
  slug: string,
  declares: readonly string[],
  over: readonly string[] = []
): undefined {
  const at = `akasha/${slug}.page-type.ts`
  const id = idFor(`page-type/${slug}`)
  const carried = declares.map((one) => ({ pageProperty: one, required: false, many: false }))
  const value = { id, pageTypeSlug: "page-type", slug, extends: over, properties: carried }
  put(root, at, `export const held = ${JSON.stringify(value)}\n`)
  filed(root, `identity/page-type/page-type/slug/${slug}.jsonl`, { path: at, id })
  valueAlsoFiled(root, "page-type", [{ path: at, value }])
}

function named(
  root: string,
  slug: string,
  unique: string | null = null,
  propertySlug: string = slug
): undefined {
  shapeAdded(root, SHAPE, slug, [
    { pageTypeSlug: SHAPE, targetPageTypeSlug: null, unique, slug, propertySlug },
  ])
}

const HELD_AT = `akasha/held.${SHAPE}.ts`

function heldBody(said: string): string {
  const id = idFor(`${SHAPE}/held`)
  return `export const held = { id: "${id}", pageTypeSlug: "${SHAPE}", slug: "held", propertySlug: "held"${said} }\n`
}

function patchOver(root: string, changes: ReadonlyMap<string, string | null>): Change {
  const was = (path: string): Uint8Array | null =>
    there(root, path) ? readFileSync(join(root, path)) : null
  return {
    root,
    changed: [...changes.keys()].sort(),
    after: (path) => {
      if (!changes.has(path)) return was(path)
      const body = changes.get(path) ?? null
      return body === null ? null : new TextEncoder().encode(body)
    },
    before: was,
  }
}

function overOne(root: string, body: string | null): readonly string[] {
  const cast = shadowFor(patchOver(root, new Map([[HELD_AT, body]])))
  if ("refused" in cast) throw new Error(cast.refused)
  return [...generatedProperties(cast.shadow).keys()]
}

function rooted(): string {
  const root = scratch.rootFor("akasha-generated-")
  kind(root, "uuid-v7", false)
  kind(root, "waiting", true)
  typed(root, SHAPE, ["slug", GENERATOR], ["page"])
  typed(root, KIND, [], ["page"])
  shapeAdded(root, RELATION, GENERATOR, [
    { targetPageTypeSlug: KIND, unique: null, propertySlug: GENERATOR },
  ])
  return root
}

test("an index naming no property answers no generated property", () => {
  expect([...generatedProperties(shadowAt(rooted())).keys()]).toEqual([])
})

test("a property stating a generator is answered by its slug", () => {
  const root = rooted()
  named(root, "held")
  property(root, "held", "uuid-v7")
  expect([...generatedProperties(shadowAt(root)).keys()]).toEqual(["held"])
})

test("a property stating no generator is not answered, so the set is what pages say", () => {
  const root = rooted()
  named(root, "held")
  property(root, "held", null)
  expect([...generatedProperties(shadowAt(root)).keys()]).toEqual([])
})

test("a property stating `generator` as nothing states no generator", () => {
  const root = rooted()
  named(root, "held")
  property(root, "held", null, "held", ", generator: null")
  expect([...generatedProperties(shadowAt(root)).keys()]).toEqual([])
})

test("a property page the index files no generator for is not read", () => {
  const root = rooted()
  property(root, "held", null, "held", ', generator: "uuid-v7"')
  expect([...generatedProperties(shadowAt(root)).keys()]).toEqual([])
})

test("a property the index names and no page stands for answers nothing rather than throwing", () => {
  const root = rooted()
  edged(root, "held", "uuid-v7")
  expect([...generatedProperties(shadowAt(root)).keys()]).toEqual([])
})

test("the slugs come back in one order, whatever order the index answers them in", () => {
  const root = rooted()
  for (const slug of ["beta", "alpha"]) {
    named(root, slug)
    property(root, slug, "uuid-v7")
  }
  expect([...generatedProperties(shadowAt(root)).keys()]).toEqual(["alpha", "beta"])
})

test("a third property taking a generator is answered with no code changed here", () => {
  const root = rooted()
  for (const slug of ["one", "two", "three"]) {
    named(root, slug)
    property(root, slug, "waiting")
  }
  expect([...generatedProperties(shadowAt(root)).keys()]).toEqual(["one", "three", "two"])
})

test("a generator a change declares is answered while that change is being judged", () => {
  const root = rooted()
  named(root, "slug", "page-type")
  named(root, "held")
  property(root, "held", null)
  expect([...generatedProperties(shadowAt(root)).keys()]).toEqual([])
  expect(overOne(root, heldBody(', generator: "uuid-v7"'))).toEqual(["held"])
})

test("a property declared and leaned on in one change is answered, so the two land together", () => {
  const root = rooted()
  named(root, "slug", "page-type")
  expect([...generatedProperties(shadowAt(root)).keys()]).toEqual([])
  expect(overOne(root, heldBody(', generator: "uuid-v7"'))).toEqual(["held"])
})

test("a generator a change takes away stops being answered while that change is judged", () => {
  const root = rooted()
  named(root, "slug", "page-type")
  named(root, "held")
  property(root, "held", "uuid-v7")
  expect([...generatedProperties(shadowAt(root)).keys()]).toEqual(["held"])
  expect(overOne(root, heldBody(""))).toEqual([])
})

test("a property page a change takes away is answered by nothing", () => {
  const root = rooted()
  named(root, "slug", "page-type")
  named(root, "held")
  property(root, "held", "uuid-v7")
  expect(overOne(root, null)).toEqual([])
})

test("a generated property carries the kind that works it out", () => {
  const root = rooted()
  named(root, "held")
  property(root, "held", "uuid-v7")

  expect(generatedProperties(shadowAt(root)).get("held")).toEqual({
    key: "held",
    kind: "uuid-v7",
    afterChecks: false,
  })
})

test("whether a value waits for the checks is read from the kind's own page", () => {
  const root = rooted()
  named(root, "early")
  property(root, "early", "uuid-v7")
  named(root, "late")
  property(root, "late", "waiting")

  expect(generatedProperties(shadowAt(root)).get("late")?.afterChecks).toBe(true)
  expect([...waitingProperties(shadowAt(root))]).toEqual(["late"])
})

test("a generated property is read by the key its property states rather than by its slug", () => {
  const root = rooted()
  named(root, "held", null, "read-by")
  property(root, "held", "uuid-v7", "read-by")

  expect(generatedProperties(shadowAt(root)).get("held")?.key).toBe("readBy")
})

test("what waits for the checks is named by its key where a reader asks for keys", () => {
  const root = rooted()
  named(root, "held", null, "read-by")
  property(root, "held", "waiting", "read-by")

  expect([...waitingProperties(shadowAt(root))]).toEqual(["held"])
  expect([...waitingKeys(shadowAt(root))]).toEqual(["readBy"])
})
