import { put } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import {
  type Answering,
  answeringOver,
  type PageOf,
} from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import { claimantIn } from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  besideAdded,
  linesFiled,
} from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  fileNameOf,
  type Reference,
  referencesAt,
} from "akasha/page/modules/referencing/page-referencing.module.code.ts"
import { bodyOf } from "akasha/page/modules/referencing/page-referencing.module.test-fixtures.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"

const GRAPH_EDGE = "graph-edge"

const GRAPH_ATTRIBUTE = "graph-attribute"

const HELD_TYPE = "held-type"

const LOADED = "loaded"

const PREFIX = "graph-asking-"

export const EDGE_ID = "01a04ff4-0000-7000-8000-00000000000e"

const TARGET_ID = "01a04ff4-0000-7000-8000-00000000000a"

export const SOURCE_ID = "01a04ff4-0000-7000-8000-00000000000b"

const LOADED_ID = "01a04ff4-0000-7000-8000-000000000011"

export const EDGE_AT = "akasha/held/held.graph-edge.ts"

const IMPORT = "import"

export const IMPORT_EDGE = "import-edge"

export const RELATION = "relation"

export const PROPERTY = "property"

export const KNOWN = "known"

export const BY_REFERENCE = "reference"

export const BY_DECLARATION = "declaration"

export const NAMES = "names"

export const NAMES_TYPE = "type"

export const NAMES_CODE = "code"

export const LOADING = "loading"

export const AT_LOAD = "at-load"

export const DEFERRED = "deferred"

export const PART = "part-slugs"

export const LOADED_BY = "loaded-by"

export const HELD = "held"

const PAGE_TYPE = "page-type"

export const MODULE = "module"

export const HELD_LOADER = "held-loader"

export const TARGET_AT = "akasha/held/target.page.ts"

export const SOURCE_AT = "akasha/held/source.page.ts"

export const SIDECAR_AT = "akasha/held/target.page.code.ts"

export const FIRST_AT = "akasha/held/first.page.ts"

export const SECOND_AT = "akasha/held/second.page.ts"

export const THIRD_AT = "akasha/held/third.page.ts"

export const APART_AT = "akasha/held/apart.page.txt"

const TYPE_ID = "01a04ff4-0000-7000-8000-00000000000f"

const LOADER_ID = "01a04ff4-0000-7000-8000-000000000010"

const MODULE_TYPE_ID = "01a04ff4-0000-7000-8000-000000000012"

export const TYPE_AT = "akasha/held/held-type.page-type.ts"

const MODULE_TYPE_AT = "akasha/held/module.page-type.ts"

export const LOADER_AT = "akasha/held/held-loader.module.ts"

export const LOADED_AT = "akasha/held/loaded.held-type.ts"

export const LOADED_CODE_AT = "akasha/held/loaded.held-type.code.ts"

const TYPE_FILED_AT = `page-type/${PAGE_TYPE}/slug/${HELD_TYPE}.jsonl`

const PAGE = "page"

const TARGET = "target"

const PAGE_TYPE_ID = "01a04ff4-0000-7000-8000-000000000013"

const PAGE_TYPE_AT = "akasha/held/page.page-type.ts"

const PAGE_FILED_AT = `page-type/${PAGE_TYPE}/slug/${PAGE}.jsonl`

const MODULE_FILED_AT = `page-type/${PAGE_TYPE}/slug/${MODULE}.jsonl`

export const scratch = scratchWorld()

function paged(root: string, at: string, held: Record<string, unknown>): undefined {
  put(root, at, `export const held = ${JSON.stringify(held, null, 2)}\n`)
}

function filedAll(root: string, at: string, said: readonly Record<string, string>[]): undefined {
  linesFiled(root, at, said)
}

function filed(root: string, at: string, said: Record<string, string>): undefined {
  filedAll(root, at, [said])
}

function importReferences(into: string, from: readonly string[]): readonly Reference[] {
  return from.map((one) => ({
    propertySlug: IMPORT,
    fileName: fileNameOf(into),
    path: one,
    id: null,
  }))
}

function bodyBeside(page: string, references: readonly Reference[]): Record<string, string> {
  const at = referencesAt(page)
  return at === null ? {} : { [at]: bodyOf(references) }
}

export function importsFiled(root: string, into: string, from: readonly string[]): undefined {
  const owner = claimantIn(root, into)
  if (owner === null) return
  besideAdded(root, owner, importReferences(into, from))
}

export function importsBeside(
  root: string,
  into: string,
  from: readonly string[]
): Record<string, string> {
  const owner = claimantIn(root, into)
  return owner === null ? {} : bodyBeside(owner, importReferences(into, from))
}

export function namedBeside(
  page: string,
  propertySlug: string,
  from: string,
  id: string
): Record<string, string> {
  return bodyBeside(page, [{ propertySlug, fileName: null, path: from, id }])
}

export function namingBody(from: string): string {
  return `import { held } from "${from}"\n`
}

export function typingBody(from: string): string {
  return `import type { Held } from "${from}"\n`
}

export function callingBody(from: string): string {
  return `export const held = await import("${from}")\n`
}

export function edgeFiledAt(kind: string): string {
  return `page-type/${GRAPH_EDGE}/slug/${kind}.jsonl`
}

function edged(
  root: string,
  kind: string,
  held: Record<string, unknown>,
  exists: boolean
): undefined {
  paged(root, EDGE_AT, {
    id: EDGE_ID,
    pageTypeSlug: GRAPH_EDGE,
    slug: kind,
    definition: "an edge kind a test invented",
    ...held,
  })
  if (exists) filed(root, edgeFiledAt(kind), { path: EDGE_AT, id: EDGE_ID })
}

function pageTyped(root: string): undefined {
  paged(root, PAGE_TYPE_AT, {
    id: PAGE_TYPE_ID,
    pageTypeSlug: PAGE_TYPE,
    slug: PAGE,
    definition: "a page type a test invented",
  })
  filed(root, PAGE_FILED_AT, { path: PAGE_TYPE_AT, id: PAGE_TYPE_ID })
}

export function relationWorld(lines: number, pagesExist = true): string {
  const root = scratch.rootFor(PREFIX)
  edged(root, RELATION, { attributes: [`${GRAPH_ATTRIBUTE}/${PROPERTY}`] }, pagesExist)
  pageTyped(root)
  paged(root, TARGET_AT, {
    id: TARGET_ID,
    pageTypeSlug: PAGE,
    slug: TARGET,
    definition: "a page a test invented",
  })
  filed(root, `path/${TARGET_AT}.jsonl`, { path: TARGET_AT, id: TARGET_ID })
  filed(root, `path/${SIDECAR_AT}.jsonl`, { path: TARGET_AT, id: TARGET_ID })
  filed(root, `page/id/${TARGET_ID}.jsonl`, { path: TARGET_AT, id: TARGET_ID })
  if (lines > 0) {
    besideAdded(
      root,
      TARGET_AT,
      Array.from({ length: lines }, () => ({
        propertySlug: PART,
        fileName: null,
        path: SOURCE_AT,
        id: SOURCE_ID,
      }))
    )
  }
  return root
}

const CARRIED = [KNOWN, NAMES, LOADING]

function worldFor(attributes: readonly string[] = CARRIED): string {
  const root = scratch.rootFor(PREFIX)
  edged(
    root,
    IMPORT_EDGE,
    { attributes: attributes.map((one) => `${GRAPH_ATTRIBUTE}/${one}`) },
    true
  )
  pageTyped(root)
  filed(root, `path/${EDGE_AT}.jsonl`, { path: EDGE_AT, id: EDGE_ID })
  return root
}

export function importWorld(attributes: readonly string[] = CARRIED): string {
  const root = worldFor(attributes)
  importsFiled(root, TARGET_AT, [SOURCE_AT])
  return root
}

export function reachingWorld(reaching: Readonly<Record<string, readonly string[]>>): string {
  const root = worldFor()
  for (const [into, from] of Object.entries(reaching)) importsFiled(root, into, from)
  return root
}

export function loadingWorld(loadedBy: string | null, typeExists = true): string {
  const root = worldFor()
  paged(root, TYPE_AT, {
    id: TYPE_ID,
    pageTypeSlug: PAGE_TYPE,
    slug: HELD_TYPE,
    definition: "a page type a test invented",
    ...(loadedBy === null ? {} : { loadedBy }),
  })
  if (typeExists) filed(root, TYPE_FILED_AT, { path: TYPE_AT, id: TYPE_ID })
  importsFiled(root, LOADED_AT, [SOURCE_AT])
  paged(root, LOADER_AT, {
    id: LOADER_ID,
    pageTypeSlug: MODULE,
    slug: HELD_LOADER,
    definition: "a module a test invented",
    code: "ts",
  })
  filed(root, `page-type/${MODULE}/slug/${HELD_LOADER}.jsonl`, {
    path: LOADER_AT,
    id: LOADER_ID,
  })
  paged(root, LOADED_AT, { id: LOADED_ID, pageTypeSlug: HELD_TYPE, slug: LOADED })
  filed(root, `path/${LOADED_AT}.jsonl`, { path: LOADED_AT, id: LOADED_ID })
  filed(root, `path/${LOADED_CODE_AT}.jsonl`, { path: LOADED_AT, id: LOADED_ID })
  return root
}

export function loaderWorld(names = true): string {
  const root = scratch.rootFor(PREFIX)
  edged(root, RELATION, { attributes: [`${GRAPH_ATTRIBUTE}/${PROPERTY}`] }, true)
  paged(root, TYPE_AT, {
    id: TYPE_ID,
    pageTypeSlug: PAGE_TYPE,
    slug: HELD_TYPE,
    definition: "a page type a test invented",
    loadedBy: `${MODULE}/${HELD_LOADER}`,
  })
  filed(root, `path/${TYPE_AT}.jsonl`, { path: TYPE_AT, id: TYPE_ID })
  filed(root, `page/id/${TYPE_ID}.jsonl`, { path: TYPE_AT, id: TYPE_ID })
  filed(root, TYPE_FILED_AT, { path: TYPE_AT, id: TYPE_ID })
  paged(root, LOADER_AT, {
    id: LOADER_ID,
    pageTypeSlug: MODULE,
    slug: HELD_LOADER,
    definition: "a module a test invented",
    code: "ts",
  })
  filed(root, `path/${LOADER_AT}.jsonl`, { path: LOADER_AT, id: LOADER_ID })
  filed(root, `page/id/${LOADER_ID}.jsonl`, { path: LOADER_AT, id: LOADER_ID })
  paged(root, MODULE_TYPE_AT, {
    id: MODULE_TYPE_ID,
    pageTypeSlug: PAGE_TYPE,
    slug: MODULE,
    definition: "a page type a test invented",
  })
  filed(root, MODULE_FILED_AT, { path: MODULE_TYPE_AT, id: MODULE_TYPE_ID })
  paged(root, LOADED_AT, { id: LOADED_ID, pageTypeSlug: HELD_TYPE, slug: LOADED })
  filed(root, `path/${LOADED_AT}.jsonl`, { path: LOADED_AT, id: LOADED_ID })
  filed(root, `page-type/${HELD_TYPE}/slug/${LOADED}.jsonl`, {
    path: LOADED_AT,
    id: LOADED_ID,
  })
  linesFiled(root, `value/${HELD_TYPE}.jsonl`, [
    { path: LOADED_AT, value: { id: LOADED_ID, pageTypeSlug: HELD_TYPE, slug: LOADED } },
  ])
  if (names) {
    besideAdded(root, LOADER_AT, [
      { propertySlug: LOADED_BY, fileName: null, path: TYPE_AT, id: TYPE_ID },
    ])
  }
  return root
}

export function bodiesIn(root: string): PageOf {
  return (path) => valueAt(path, root)
}

export function indexOver(reading: Reading, pageOf: PageOf): Answering {
  return answeringOver(reading, pageOf)
}

export function indexOf(root: string): Answering {
  return indexOver(readingIn(root), bodiesIn(root))
}
