import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import {
  linesFiled,
  stampedIn,
} from "../../pages-system/indexes/index-reading/index-reading.module.test-fixtures.ts"
import { gitIn } from "../../testing-system/gitting/gitting.module.code.ts"
import { put } from "../../testing-system/putting/putting.module.code.ts"

const GRAPH_EDGE = "graph-edge"

const GRAPH_ATTRIBUTE = "graph-attribute"

const INDEX = "index"

const HELD_INDEX = "held-index"

const HELD_RELATION = "held-relation"

const HELD_TYPE = "held-type"

const LOADED = "loaded"

const INVENTED = "an index a test invented so that no name could be assumed"

const TREE = "akasha"

const PREFIX = "graph-asking-"

export const EDGE_ID = "01a04ff4-0000-7000-8000-00000000000e"

export const INDEX_ID = "01a04ff4-0000-7000-8000-00000000000d"

const TARGET_ID = "01a04ff4-0000-7000-8000-00000000000a"

const SOURCE_ID = "01a04ff4-0000-7000-8000-00000000000b"

const LOADED_ID = "01a04ff4-0000-7000-8000-000000000011"

export const EDGE_AT = "akasha/held/held.graph-edge.ts"

export const INDEX_AT = "akasha/held/held-index.index.ts"

export const IMPORT = "import"

export const IMPORT_EDGE = "import-edge"

export const RELATION = "relation"

export const PROPERTY = "property"

export const KNOWN = "known"

export const AT_INDEX = "index"

export const DECLARED = "declaration"

export const PART = "part-slugs"

export const HELD = "held"

export const PAGE_TYPE = "page-type"

export const MODULE = "module"

export const HELD_LOADER = "held-loader"

export const TARGET_AT = "akasha/held/target.page.ts"

export const SOURCE_AT = "akasha/held/source.page.ts"

export const SIDECAR_AT = "akasha/held/target.page.code.ts"

export const FIRST_AT = "akasha/held/first.ts"

export const SECOND_AT = "akasha/held/second.ts"

export const THIRD_AT = "akasha/held/third.ts"

export const APART_AT = "akasha/held/apart.txt"

export const TYPE_ID = "01a04ff4-0000-7000-8000-00000000000f"

export const LOADER_ID = "01a04ff4-0000-7000-8000-000000000010"

export const MODULE_TYPE_ID = "01a04ff4-0000-7000-8000-000000000012"

export const TYPE_AT = "akasha/held/held-type.page-type.ts"

export const MODULE_TYPE_AT = "akasha/held/module.page-type.ts"

export const LOADER_AT = "akasha/held/held-loader.module.ts"

export const LOADER_CODE_AT = "akasha/held/held-loader.module.code.ts"

export const LOADED_AT = "akasha/held/loaded.held-type.ts"

export const LOADED_CODE_AT = "akasha/held/loaded.held-type.code.ts"

export const LEAF_AT = `${HELD_RELATION}/page/id/${TARGET_ID}/${PART}/${SOURCE_ID}.jsonl`

export const TYPE_STANDS_AT = `identity/${PAGE_TYPE}/slug/${HELD_TYPE}.jsonl`

export const scratch = scratchWorld()

export function paged(root: string, at: string, held: Record<string, unknown>): undefined {
  put(root, at, `export const held = ${JSON.stringify(held, null, 2)}\n`)
}

function filedAll(root: string, at: string, said: readonly Record<string, string>[]): undefined {
  linesFiled(root, at, said)
}

export function filed(root: string, at: string, said: Record<string, string>): undefined {
  filedAll(root, at, [said])
}

export const INDEX_STANDS_AT = `identity/${INDEX}/slug/${HELD_INDEX}.jsonl`

export function edgeStandsAt(kind: string): string {
  return `identity/${GRAPH_EDGE}/slug/${kind}.jsonl`
}

function indexed(root: string, indexName: string, stands: boolean): undefined {
  paged(root, INDEX_AT, {
    id: INDEX_ID,
    pageTypeSlug: INDEX,
    slug: HELD_INDEX,
    definition: INVENTED,
    indexName,
  })
  if (stands) filed(root, INDEX_STANDS_AT, { path: INDEX_AT, id: INDEX_ID })
}

function edged(
  root: string,
  kind: string,
  held: Record<string, unknown>,
  stands: boolean
): undefined {
  paged(root, EDGE_AT, {
    id: EDGE_ID,
    pageTypeSlug: GRAPH_EDGE,
    slug: kind,
    definition: "an edge kind a test invented",
    indexSlug: `${INDEX}/${HELD_INDEX}`,
    ...held,
  })
  if (stands) filed(root, edgeStandsAt(kind), { path: EDGE_AT, id: EDGE_ID })
}

export function relationWorld(lines: number, pagesStand = true): string {
  const root = scratch.rootFor(PREFIX)
  edged(root, RELATION, { attributeSlugs: [`${GRAPH_ATTRIBUTE}/${PROPERTY}`] }, pagesStand)
  indexed(root, HELD_RELATION, pagesStand)
  filed(root, `path/${TARGET_AT}.jsonl`, { path: TARGET_AT, id: TARGET_ID })
  filed(root, `path/${SIDECAR_AT}.jsonl`, { path: TARGET_AT, id: TARGET_ID })
  if (lines > 0) {
    filedAll(
      root,
      LEAF_AT,
      Array.from({ length: lines }, () => ({ path: SOURCE_AT }))
    )
  }
  return root
}

function stoodUp(indexName: string): string {
  const root = scratch.rootFor(PREFIX)
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", HELD])
  gitIn(root, ["config", "user.name", HELD])
  put(root, HELD, `${HELD}\n`)
  gitIn(root, ["add", "--", HELD])
  gitIn(root, ["commit", "--quiet", "-m", HELD, "--", HELD])
  stampedIn(root, {
    commit: gitIn(root, ["rev-parse", "HEAD"]).trim(),
    tree: TREE,
    settled: [],
  })
  edged(root, IMPORT_EDGE, { attributeSlugs: [`${GRAPH_ATTRIBUTE}/${KNOWN}`] }, true)
  indexed(root, indexName, true)
  return root
}

export function importWorld(indexName: string): string {
  const root = stoodUp(indexName)
  filed(root, `${IMPORT}/path/${TARGET_AT}.jsonl`, { path: SOURCE_AT })
  return root
}

export function reachingWorld(reaching: Readonly<Record<string, readonly string[]>>): string {
  const root = stoodUp(IMPORT)
  for (const [into, from] of Object.entries(reaching)) {
    filedAll(
      root,
      `${IMPORT}/path/${into}.jsonl`,
      from.map((one) => ({ path: one }))
    )
  }
  return root
}

export function loadingWorld(loadedBySlug: string | null, typeStands = true): string {
  const root = stoodUp(IMPORT)
  filed(root, `${IMPORT}/path/${LOADED_AT}.jsonl`, { path: SOURCE_AT })
  paged(root, TYPE_AT, {
    id: TYPE_ID,
    pageTypeSlug: PAGE_TYPE,
    slug: HELD_TYPE,
    definition: "a page type a test invented",
    ...(loadedBySlug === null ? {} : { loadedBySlug }),
  })
  if (typeStands) filed(root, TYPE_STANDS_AT, { path: TYPE_AT, id: TYPE_ID })
  paged(root, LOADER_AT, {
    id: LOADER_ID,
    pageTypeSlug: MODULE,
    slug: HELD_LOADER,
    definition: "a module a test invented",
    code: "ts",
  })
  filed(root, `identity/${MODULE}/slug/${HELD_LOADER}.jsonl`, { path: LOADER_AT, id: LOADER_ID })
  paged(root, LOADED_AT, { id: LOADED_ID, pageTypeSlug: HELD_TYPE, slug: LOADED })
  filed(root, `path/${LOADED_AT}.jsonl`, { path: LOADED_AT, id: LOADED_ID })
  filed(root, `path/${LOADED_CODE_AT}.jsonl`, { path: LOADED_AT, id: LOADED_ID })
  return root
}
