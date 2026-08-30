import {
  slugOf,
  textAt,
  type Value,
  valueAt,
} from "../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  importersOf,
  indexIn,
  type Standing,
  standingAt,
  standingByPath,
} from "../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import {
  type Reading,
  readingAt,
} from "../../pages-system/indexes/index-surface/index-surface.module.code.ts"
import { addressIn } from "../../pages-system/page/page-address/page-address.module.code.ts"
import { besideAt } from "../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import type { Known } from "../graph-attribute/graph-attributes/known.graph-attribute.ts"

const GRAPH_EDGE = "graph-edge"

const IMPORT_EDGE = "import-edge"

const RELATION = "relation"

const INDEX_SLUG = "indexSlug"

const INDEX_NAME = "indexName"

const ATTRIBUTE_SLUGS = "attributeSlugs"

const AT_PAGE = "page"

const AT_ID = "id"

const PAGE_TYPE = "page-type"

const PAGE_TYPE_SLUG = "pageTypeSlug"

const LOADED_BY_SLUG = "loadedBySlug"

const CODE = "code"

const TS = "ts"

const ENDING = ".jsonl"

const APART = "\n"

const BY_INDEX: Known = "index"

const BY_DECLARATION: Known = "declaration"

export type Edge = {
  readonly kind: string
  readonly from: string
  readonly to: string
  readonly attrs: Readonly<Record<string, string>>
}

export type Asking = {
  readonly kind: string
  readonly indexName: string
  readonly attributeSlugs: readonly string[]
}

function askedFor(path: string, kinds: readonly string[]): string {
  return `what reaches \`${path}\` as ${[...new Set(kinds)].sort().join(", ")}`
}

function valueFor(root: string, path: string, asked: string): Value {
  const held = valueAt(path, root)
  if (held === null) {
    throw new Error(`\`${path}\` would not read, so ${asked} could not be answered`)
  }
  return held
}

function textFor(held: Value, key: string, path: string, asked: string): string {
  const said = textAt(held, key)
  if (said === null) {
    throw new Error(`\`${path}\` says no \`${key}\`, so ${asked} could not be answered`)
  }
  return said
}

function standingFor(
  reading: Reading,
  pageTypeSlug: string,
  slug: string,
  asked: string
): Standing {
  const found = standingAt(reading, pageTypeSlug, slug)[0]
  if (found === undefined) {
    throw new Error(
      `no \`${pageTypeSlug}\` page is slugged \`${slug}\`, so ${asked} could not be answered`
    )
  }
  return found
}

function indexNameFor(root: string, reading: Reading, named: string, asked: string): string {
  const address = addressIn(named)
  if (address.kind !== "qualified") {
    throw new Error(`\`${named}\` names no page type, so ${asked} could not be answered`)
  }
  const found = standingFor(reading, address.pageTypeSlug, address.slug, asked)
  return textFor(valueFor(root, found.path, asked), INDEX_NAME, found.path, asked)
}

function attributesIn(held: Value): readonly string[] {
  const said = held[ATTRIBUTE_SLUGS]
  if (!Array.isArray(said)) return []
  return said.filter((one): one is string => typeof one === "string").map(slugOf)
}

function askingFor(root: string, reading: Reading, kind: string, asked: string): Asking {
  const found = standingFor(reading, GRAPH_EDGE, kind, asked)
  const held = valueFor(root, found.path, asked)
  return {
    kind,
    indexName: indexNameFor(root, reading, textFor(held, INDEX_SLUG, found.path, asked), asked),
    attributeSlugs: attributesIn(held),
  }
}

function attributeFor(asking: Asking, asked: string): string {
  const only = asking.attributeSlugs[0]
  if (asking.attributeSlugs.length !== 1 || only === undefined) {
    throw new Error(
      `the \`${asking.kind}\` edge carries ${asking.attributeSlugs.length} attributes rather than the one it is read by, so ${asked} could not be answered`
    )
  }
  return only
}

function loadingInto(root: string, reading: Reading, path: string): string | null {
  const standing = standingByPath(reading, path)[0]
  if (standing === undefined) return null
  const page = valueAt(standing.path, root)
  if (page === null) return null
  const pageTypeSlug = textAt(page, PAGE_TYPE_SLUG)
  if (pageTypeSlug === null) return null
  const type = standingAt(reading, PAGE_TYPE, pageTypeSlug)[0]
  if (type === undefined) return null
  const held = valueAt(type.path, root)
  if (held === null) return null
  const named = textAt(held, LOADED_BY_SLUG)
  if (named === null) return null
  const address = addressIn(named)
  if (address.kind !== "qualified") return null
  const loader = standingAt(reading, address.pageTypeSlug, address.slug)[0]
  if (loader === undefined) return null
  return besideAt(loader.path, CODE, TS)
}

function importsInto(
  root: string,
  reading: Reading,
  path: string,
  asking: Asking,
  asked: string
): readonly Edge[] {
  const attribute = attributeFor(asking, asked)
  const found: Edge[] = importersOf(root, path, reading).map((from) => ({
    kind: asking.kind,
    from,
    to: path,
    attrs: { [attribute]: BY_INDEX },
  }))
  const loading = loadingInto(root, reading, path)
  if (loading === null || loading === path) return found
  return [
    ...found,
    { kind: asking.kind, from: loading, to: path, attrs: { [attribute]: BY_DECLARATION } },
  ]
}

function sourcesUnder(reading: Reading, at: string): readonly string[] {
  const found: string[] = []
  for (const one of reading.listing(at)) {
    if (!one.name.endsWith(ENDING)) continue
    for (const line of reading.lines(`${at}/${one.name}`)) {
      const said = JSON.parse(line) as { readonly path?: unknown }
      if (typeof said.path === "string") found.push(said.path)
    }
  }
  return found
}

function relationsInto(
  reading: Reading,
  path: string,
  asking: Asking,
  asked: string
): readonly Edge[] {
  const under = `${asking.indexName}/${AT_PAGE}/${AT_ID}`
  const attribute = attributeFor(asking, asked)
  const found: Edge[] = []
  for (const one of standingByPath(reading, path)) {
    const here = `${under}/${one.id}`
    for (const property of reading.listing(here)) {
      if (!property.directory) continue
      for (const from of sourcesUnder(reading, `${here}/${property.name}`)) {
        found.push({
          kind: asking.kind,
          from,
          to: one.path,
          attrs: { [attribute]: property.name },
        })
      }
    }
  }
  return found
}

function keyOf(one: Edge): string {
  return [one.kind, one.from, one.to, JSON.stringify(one.attrs)].join(APART)
}

export function edgesInto(
  root: string,
  path: string,
  kinds: readonly string[],
  reading: Reading = readingAt(indexIn(root))
): readonly Edge[] {
  if (kinds.length === 0) return []
  const asked = askedFor(path, kinds)
  const found: Edge[] = []
  for (const kind of new Set(kinds)) {
    const asking = askingFor(root, reading, kind, asked)
    if (kind === IMPORT_EDGE) found.push(...importsInto(root, reading, path, asking, asked))
    else if (kind === RELATION) found.push(...relationsInto(reading, path, asking, asked))
    else {
      throw new Error(
        `the \`${kind}\` edge is not yet read into a node, so ${asked} could not be answered`
      )
    }
  }
  const kept = new Map<string, Edge>()
  for (const one of found) kept.set(keyOf(one), one)
  return [...kept.values()].sort((one, two) => {
    const here = keyOf(one)
    const there = keyOf(two)
    return here < there ? -1 : here > there ? 1 : 0
  })
}

export function reachingInto(
  root: string,
  paths: readonly string[],
  kinds: readonly string[],
  through: (path: string) => boolean = () => true,
  reading: Reading = readingAt(indexIn(root))
): readonly string[] {
  const found = new Set(paths.filter((one) => through(one)))
  const waiting = [...found]
  for (let one = waiting.pop(); one !== undefined; one = waiting.pop()) {
    for (const edge of edgesInto(root, one, kinds, reading)) {
      if (found.has(edge.from) || !through(edge.from)) continue
      found.add(edge.from)
      waiting.push(edge.from)
    }
  }
  return [...found].sort()
}
