import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { put, there } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import { importEdge } from "akasha/graph/edge/pages/import-edge.graph-edge.ts"
import { importIn } from "akasha/page/index/import/index-import.index.code.ts"
import { indexImport } from "akasha/page/index/import/index-import.index.ts"
import type { Entry } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { idFiled, listedFiled } from "akasha/page/index/modules/filing/index-filing.module.code.ts"
import {
  entriesFiled,
  noImportersFiled,
} from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { importedFrom } from "akasha/page/modules/reference-filing/page-reference-filing.module.code.ts"
import { referencesEach } from "akasha/page/modules/referencing/page-referencing.module.code.ts"
import { bodyOf } from "akasha/page/modules/referencing/page-referencing.module.test-fixtures.ts"
import { scratchWorld } from "akasha/util/fs/modules/scratching/scratching.module.code.ts"
import { textThere } from "akasha/util/fs/modules/text-there/text-there.module.code.ts"

const EDGE_PAGE_AT = "graph/import-edge.graph-edge.ts"

const INDEX_PAGE_AT = "graph/index-import.index.ts"

const MODULE_TYPE_AT = "akasha/module.page-type.ts"

const MODULE_TYPE_ID = "01a0a3d6-0000-7000-8000-00000000000a"

const PAGE_TYPE = "page-type"

const MODULE = "module"

export const scratch = scratchWorld()

export function bodied(held: unknown): string {
  return `export const held = ${JSON.stringify(held, null, 2)}\n`
}

export function named(
  root: string,
  at: string,
  pageType: string,
  slug: string,
  id: string
): undefined {
  listedFiled(root, pageType, slug, [{ path: at, id }])
  idFiled(root, id, [{ path: at, id }])
}

function besided(root: string, entries: readonly Entry[]): undefined {
  const held = new Map<string, string[]>()
  for (const one of entries) {
    const lines = held.get(one.at) ?? []
    lines.push(one.line)
    held.set(one.at, lines)
  }
  for (const [at, lines] of held) {
    const beside = join(root, at)
    mkdirSync(dirname(beside), { recursive: true })
    const was = textThere(beside)
    const kept = was === null ? [] : was.split("\n").filter((one) => one !== "")
    writeFileSync(beside, bodyOf(referencesEach([...kept, ...lines])))
  }
}

function reaching(root: string, files: Readonly<Record<string, string>>): undefined {
  noImportersFiled(root)
  for (const [at, body] of Object.entries(files)) {
    entriesFiled(root, importIn(body, at, root))
    besided(root, importedFrom(root, body, at, root))
  }
}

function paged(root: string, at: string, held: unknown): undefined {
  put(root, at, bodied(held))
}

function pageTyped(root: string): undefined {
  paged(root, MODULE_TYPE_AT, {
    id: MODULE_TYPE_ID,
    type: PAGE_TYPE,
    slug: MODULE,
    definition: "the page type the pages in this checkout are",
  })
  named(root, MODULE_TYPE_AT, PAGE_TYPE, MODULE, MODULE_TYPE_ID)
}

function graphed(root: string): undefined {
  paged(root, EDGE_PAGE_AT, importEdge)
  paged(root, INDEX_PAGE_AT, indexImport)
  named(root, EDGE_PAGE_AT, importEdge.type, importEdge.slug, importEdge.id)
  named(root, INDEX_PAGE_AT, indexImport.type, indexImport.slug, indexImport.id)
}

export function staged(files: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-check-staging-")
  mkdirSync(join(root, "akasha"))
  for (const [at, body] of Object.entries(files)) {
    mkdirSync(dirname(join(root, at)), { recursive: true })
    writeFileSync(join(root, at), body)
  }
  pageTyped(root)
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

export function bodiesOver(root: string, bodies: Readonly<Record<string, string>>): Change {
  return change(root, bodies, bodies)
}
