import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { importEdge } from "akasha/graph/edges/pages/import-edge.graph-edge.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { importIn } from "akasha/pages/indexes/import/index-import.index.code.ts"
import { indexImport } from "akasha/pages/indexes/import/index-import.index.ts"
import {
  entriesFiled,
  listedFiled,
  noImportersFiled,
  pathFiled,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { put, there } from "akasha/testing-system/putting/putting.module.code.ts"
import { scratchWorld } from "../../../commands/modules/scratching/scratching.module.code.ts"

const EDGE_PAGE_AT = "graph/import-edge.graph-edge.ts"

const INDEX_PAGE_AT = "graph/index-import.index.ts"

export const scratch = scratchWorld()

export function bodied(held: unknown): string {
  return `export const held = ${JSON.stringify(held, null, 2)}\n`
}

export function named(
  root: string,
  at: string,
  pageTypeSlug: string,
  slug: string,
  id: string
): undefined {
  listedFiled(root, pageTypeSlug, slug, [{ path: at, id }])
}

function reaching(root: string, files: Readonly<Record<string, string>>): undefined {
  noImportersFiled(root)
  for (const [at, body] of Object.entries(files)) {
    entriesFiled(root, importIn(body, at, root))
  }
}

function paged(root: string, at: string, held: unknown): undefined {
  put(root, at, bodied(held))
}

function graphed(root: string): undefined {
  paged(root, EDGE_PAGE_AT, importEdge)
  paged(root, INDEX_PAGE_AT, indexImport)
  named(root, EDGE_PAGE_AT, importEdge.pageTypeSlug, importEdge.slug, importEdge.id)
  named(root, INDEX_PAGE_AT, indexImport.pageTypeSlug, indexImport.slug, indexImport.id)
  pathFiled(root, EDGE_PAGE_AT, [{ path: EDGE_PAGE_AT, id: importEdge.id }])
  pathFiled(root, INDEX_PAGE_AT, [{ path: INDEX_PAGE_AT, id: indexImport.id }])
}

export function staged(files: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-check-staging-")
  mkdirSync(join(root, "akasha"))
  for (const [at, body] of Object.entries(files)) {
    mkdirSync(dirname(join(root, at)), { recursive: true })
    writeFileSync(join(root, at), body)
  }
  reaching(root, files)
  graphed(root)
  return root
}

export function change(
  root: string,
  over: Readonly<Record<string, string | null>>,
  base: Readonly<Record<string, string>> = {}
): Change {
  const held = new Map(Object.entries(over))
  const bodies = new Map(Object.entries(base))
  const based = (path: string): Uint8Array | null => {
    const found = bodies.get(path)
    if (found !== undefined) return new TextEncoder().encode(found)
    return there(root, path) ? readFileSync(join(root, path)) : null
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
