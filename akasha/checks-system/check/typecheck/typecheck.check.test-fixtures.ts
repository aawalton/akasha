import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { importEdge } from "../../../graph-system/graph-edge/graph-edges/import-edge.graph-edge.ts"
import type { Change } from "../../../pages-system/change/change.module.code.ts"
import { importIn } from "../../../pages-system/indexes/index/index-import/index-import.index.code.ts"
import { indexImport } from "../../../pages-system/indexes/index/index-import/index-import.index.ts"
import {
  entriesFiled,
  noImportersFiled,
  pathFiled,
  schemaFiled,
  stampedIn,
  standingFiled,
} from "../../../pages-system/indexes/index-reading/index-reading.module.test-fixtures.ts"
import { headOf } from "../../../pages-system/indexes/index-stamp/index-stamp.module.code.ts"
import { gitIn } from "../../../testing-system/gitting/gitting.module.code.ts"
import { put } from "../../../testing-system/putting/putting.module.code.ts"

const EDGE_PAGE_AT = "graph/import-edge.graph-edge.ts"

const INDEX_PAGE_AT = "graph/index-import.index.ts"

const GENERATED_ID = "01a04f2b-3d24-70b3-8c3e-3076a9299145"

const THING_TYPE_AT = "akasha/thing.page-type.ts"

const HELD_AT = "akasha/held.text-property.ts"

const WAITS = "waiting"

export const EARLY = "uuid-v7"

const KIND_AT = "akasha/waiting.generator-kind.ts"

const EARLY_AT = "akasha/uuid-v7.generator-kind.ts"

const THING_TYPE =
  "export type Thing = { held: string; slug: string }\n" +
  `export const thing = { id: "${GENERATED_ID}", pageTypeSlug: "page-type", slug: "thing" }\n`

const PAGE_TYPE = "page-type"

const TEXT_PROPERTY = "text-property"

const GENERATOR_KIND = "generator-kind"

const MODULE = "module"

const HELD_TYPE = "held-type"

const HELD_LOADER = "held-loader"

const TYPE_ID = "01a04f2b-3d24-70b3-8c3e-3076a9299146"

const LOADER_ID = "01a04f2b-3d24-70b3-8c3e-3076a9299147"

const LOADED_ID = "01a04f2b-3d24-70b3-8c3e-3076a9299148"

const HELD_TYPE_AT = "akasha/held-type.page-type.ts"

const HELD_LOADER_AT = "akasha/held-loader.module.ts"

export const LOADER_CODE_AT = "akasha/held-loader.module.code.ts"

export const LOADED_AT = "akasha/loaded.held-type.ts"

const LOADER_BREAKS = "export const one: string = 1\n"

export const scratch = scratchWorld()

function reaching(root: string, files: Readonly<Record<string, string>>): undefined {
  noImportersFiled(root)
  for (const [at, body] of Object.entries(files)) {
    entriesFiled(root, importIn(body, at, root))
  }
}

function bodied(held: unknown): string {
  return `export const held = ${JSON.stringify(held, null, 2)}\n`
}

function paged(root: string, at: string, held: unknown): undefined {
  put(root, at, bodied(held))
}

function named(
  root: string,
  at: string,
  pageTypeSlug: string,
  slug: string,
  id: string
): undefined {
  standingFiled(root, pageTypeSlug, slug, [{ path: at, id }])
}

function graphed(root: string): undefined {
  paged(root, EDGE_PAGE_AT, importEdge)
  paged(root, INDEX_PAGE_AT, indexImport)
  named(root, EDGE_PAGE_AT, importEdge.pageTypeSlug, importEdge.slug, importEdge.id)
  named(root, INDEX_PAGE_AT, indexImport.pageTypeSlug, indexImport.slug, indexImport.id)
}

function stamped(root: string): undefined {
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@akasha"])
  gitIn(root, ["config", "user.name", "held"])
  writeFileSync(join(root, "seed"), "held\n")
  gitIn(root, ["add", "--", "seed"])
  gitIn(root, ["commit", "--quiet", "-m", "held", "--", "seed"])
  stampedIn(root, { commit: headOf(root) ?? "", tree: "akasha", settled: [] })
}

export function staged(files: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-typecheck-")
  mkdirSync(join(root, "akasha"))
  for (const [at, body] of Object.entries(files)) {
    mkdirSync(dirname(join(root, at)), { recursive: true })
    writeFileSync(join(root, at), body)
  }
  reaching(root, files)
  graphed(root)
  stamped(root)
  return root
}

function kindPage(slug: string, afterChecks: boolean): string {
  return (
    `export const kind = { id: "${GENERATED_ID}", pageTypeSlug: "generator-kind",` +
    ` slug: "${slug}", afterChecks: ${afterChecks} }\n`
  )
}

function heldPage(generator: string): string {
  return (
    `export const held = { id: "${GENERATED_ID}", pageTypeSlug: "text-property",` +
    ` slug: "held", generator: "${generator}" }\n`
  )
}

export function generating(files: Readonly<Record<string, string>>, generator = WAITS): string {
  const root = staged({
    [THING_TYPE_AT]: THING_TYPE,
    [HELD_AT]: heldPage(generator),
    [KIND_AT]: kindPage(WAITS, true),
    [EARLY_AT]: kindPage(EARLY, false),
    ...files,
  })
  named(root, KIND_AT, GENERATOR_KIND, WAITS, GENERATED_ID)
  named(root, EARLY_AT, GENERATOR_KIND, EARLY, GENERATED_ID)
  schemaFiled(root, TEXT_PROPERTY, "slug", [
    {
      pageTypeSlug: TEXT_PROPERTY,
      targetPageTypeSlug: null,
      unique: PAGE_TYPE,
      slug: "slug",
      propertySlug: "slug",
    },
  ])
  schemaFiled(root, TEXT_PROPERTY, "held", [
    {
      pageTypeSlug: TEXT_PROPERTY,
      targetPageTypeSlug: null,
      unique: null,
      slug: "held",
      propertySlug: "held",
    },
  ])
  named(root, HELD_AT, TEXT_PROPERTY, "held", GENERATED_ID)
  named(root, THING_TYPE_AT, PAGE_TYPE, "thing", GENERATED_ID)
  return root
}

export function declaring(): string {
  const root = staged({
    [HELD_TYPE_AT]: bodied({
      id: TYPE_ID,
      pageTypeSlug: PAGE_TYPE,
      slug: HELD_TYPE,
      loadedBySlug: `${MODULE}/${HELD_LOADER}`,
    }),
    [HELD_LOADER_AT]: bodied({
      id: LOADER_ID,
      pageTypeSlug: MODULE,
      slug: HELD_LOADER,
      code: "ts",
    }),
    [LOADER_CODE_AT]: LOADER_BREAKS,
    [LOADED_AT]: bodied({ id: LOADED_ID, pageTypeSlug: HELD_TYPE, slug: "loaded" }),
  })
  named(root, HELD_TYPE_AT, PAGE_TYPE, HELD_TYPE, TYPE_ID)
  named(root, HELD_LOADER_AT, MODULE, HELD_LOADER, LOADER_ID)
  pathFiled(root, LOADED_AT, [{ path: LOADED_AT, id: LOADED_ID }])
  return root
}

export function change(
  root: string,
  over: Readonly<Record<string, string | null>>,
  base: Readonly<Record<string, string>> = {}
): Change {
  const held = new Map(Object.entries(over))
  const standing = new Map(Object.entries(base))
  const based = (path: string): Uint8Array | null => {
    const found = standing.get(path)
    if (found !== undefined) return new TextEncoder().encode(found)
    try {
      return readFileSync(join(root, path))
    } catch {
      return null
    }
  }
  return {
    root,
    changed: [...held.keys()].sort(),
    after: (path) => {
      if (held.has(path)) {
        const said = held.get(path)
        return said === undefined || said === null ? null : new TextEncoder().encode(said)
      }
      return based(path)
    },
    before: based,
  }
}
