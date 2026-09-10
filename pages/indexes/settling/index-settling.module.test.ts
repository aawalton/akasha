import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { everyFileUnder } from "akasha/testing-system/walking/walking.module.code.ts"
import {
  aProperty,
  aType,
  bodyOf,
  butTheStamp,
  IDENTIFIERS,
  idOf,
  type Named,
  put,
  scratch,
} from "../fixture-world/fixture-world.module.code.ts"
import { type Indexing, indexingAt, rebuiltFrom } from "../indexing/indexing.module.code.ts"
import { indexRelation } from "../relation/index-relation.index.ts"

afterAll(scratch.sweep, 5000)

const TARGET_ID = idOf("b")

const SOURCE_ID = idOf("a")

const NAMING = aProperty("3", "part-slugs", "relation-property", { targetPageType: "domain" })

const RENAMED: Named = [
  "piece-slugs.relation-property.ts",
  {
    id: "3",
    pageTypeSlug: "relation-property",
    slug: "piece-slugs",
    propertySlug: "part-slugs",
    targetPageType: "domain",
  },
]

const CARRIER = aType("4", "widget", ["domain"], ["part-slugs"])

const CARRIER_AGAIN = aType("4", "widget", ["domain"], ["piece-slugs"])

const TARGET_PAGE: Named = ["b.domain.ts", { id: TARGET_ID, pageTypeSlug: "domain", slug: "b" }]

const SOURCE_PAGE: Named = [
  "one.widget.ts",
  { id: SOURCE_ID, pageTypeSlug: "widget", slug: "one", partSlugs: ["domain/b"] },
]

const heldAt = (): string => scratch.rootFor("akasha-settling-")

const edgeAt = (root: string, property: string): string =>
  join(root, indexRelation.name, "page", "id", TARGET_ID, property, `${SOURCE_ID}.jsonl`)

function wrote(indexing: Indexing, tree: string, named: readonly Named[]): undefined {
  for (const [at, value] of named) {
    const body = bodyOf(value)
    indexing.wrote(put(tree, at, body), body, null)
  }
}

test("a rebuild from the pages agrees with the index a turned relation name left", () => {
  const tree = heldAt()
  const root = heldAt()
  const first = indexingAt(root, tree)
  wrote(first, tree, [...IDENTIFIERS, NAMING, CARRIER, TARGET_PAGE, SOURCE_PAGE])
  expect(first.settle()).toEqual([])
  expect(existsSync(edgeAt(root, "part-slugs"))).toBe(true)

  const second = indexingAt(root, tree)
  const gone = join(tree, NAMING[0])
  const before = readFileSync(join(tree, CARRIER[0]), "utf8")
  const body = bodyOf(CARRIER_AGAIN[1])
  second.took(gone, readFileSync(gone, "utf8"))
  rmSync(gone)
  wrote(second, tree, [RENAMED])
  second.wrote(put(tree, CARRIER_AGAIN[0], body), body, before)
  expect(second.settle()).toEqual([])

  const rebuilt = heldAt()
  rebuiltFrom(tree, rebuilt, tree)

  expect(existsSync(edgeAt(root, "piece-slugs"))).toBe(true)
  expect(existsSync(edgeAt(root, "part-slugs"))).toBe(false)
  expect(butTheStamp(everyFileUnder(root))).toEqual(butTheStamp(everyFileUnder(rebuilt)))
})
