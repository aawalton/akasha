import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { put, there } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import { module as modulePage } from "akasha/code/module/module.page-type.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { textThere } from "akasha/file/disk/modules/text-there/text-there.module.code.ts"
import { importEdge } from "akasha/graph/edge/pages/import-edge.graph-edge.ts"
import type { Entry } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { claimantIn } from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import {
  idFiled,
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { importedFrom } from "akasha/page/modules/reference-filing/page-reference-filing.module.code.ts"
import { referencesEach } from "akasha/page/modules/referencing/page-referencing.module.code.ts"
import { bodyOf } from "akasha/page/modules/referencing/page-referencing.module.test-fixtures.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const EDGE_PAGE_AT = "graph/import-edge.graph-edge.ts"

const MODULE_TYPE_AT = "code/module.page-type.ts"

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
  listedFiled(root, slugOf(pageType), slug, [{ path: at, id }])
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

function owned(root: string, files: Readonly<Record<string, string>>): undefined {
  for (const at of Object.keys(files)) {
    const owner = claimantIn(root, at)
    const said = owner === null ? null : partedIn(owner)
    if (owner === null || said === null) continue
    valueAlsoFiled(root, said.pageType, [
      { path: owner, value: { pageTypeSlug: said.pageType, slug: said.slug } },
    ])
  }
}

function reaching(root: string, files: Readonly<Record<string, string>>): undefined {
  for (const [at, body] of Object.entries(files)) {
    besided(root, importedFrom(root, body, at, root))
  }
}

function paged(root: string, at: string, held: unknown): undefined {
  put(root, at, bodied(held))
}

function pageTyped(root: string): undefined {
  paged(root, MODULE_TYPE_AT, modulePage)
  named(root, MODULE_TYPE_AT, modulePage.type, modulePage.slug, modulePage.id)
}

function graphed(root: string): undefined {
  paged(root, EDGE_PAGE_AT, importEdge)
  named(root, EDGE_PAGE_AT, importEdge.type, importEdge.slug, importEdge.id)
}

export function staged(files: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-check-staging-")
  mkdirSync(join(root, "akasha"))
  for (const [at, body] of Object.entries(files)) {
    mkdirSync(dirname(join(root, at)), { recursive: true })
    writeFileSync(join(root, at), body)
  }
  pageTyped(root)
  owned(root, files)
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
