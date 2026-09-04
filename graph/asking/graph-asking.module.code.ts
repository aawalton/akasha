import type { Named } from "@akasha/indexes"
import type { Answering } from "@akasha/indexes/answering"
import { addressIn } from "@akasha/pages-system/page-address"
import { slugOf, textAt, type Value } from "@akasha/pages-system/page-value"
import type { Known } from "../attributes/pages/known.graph-attribute.ts"

const GRAPH_EDGE = "graph-edge"

const IMPORT_EDGE = "import-edge"

const RELATION = "relation"

const LOADED_BY = "loaded-by-slug"

const INDEX_SLUG = "indexSlug"

const INDEX_NAME = "name"

const ATTRIBUTE_SLUGS = "attributeSlugs"

const APART = "\n"

const BY_INDEX: Known = "index"

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

type Held = {
  readonly path: string
  readonly value: Value
}

function textFor(held: Value, key: string, path: string, asked: string): string {
  const said = textAt(held, key)
  if (said === null) {
    throw new Error(`\`${path}\` says no \`${key}\`, so ${asked} could not be answered`)
  }
  return said
}

function heldFor(index: Answering, pageTypeSlug: string, slug: string, asked: string): Held {
  const found = index.listedAt(pageTypeSlug, slug)[0]
  if (found === undefined) {
    throw new Error(
      `no \`${pageTypeSlug}\` page is slugged \`${slug}\`, so ${asked} could not be answered`
    )
  }
  const value = index.pageAt(pageTypeSlug, slug)
  if (value === null) {
    throw new Error(`\`${found.path}\` would not read, so ${asked} could not be answered`)
  }
  return { path: found.path, value }
}

function indexNameFor(index: Answering, named: string, asked: string): string {
  const address = addressIn(named)
  if (address.kind !== "qualified") {
    throw new Error(`\`${named}\` names no page type, so ${asked} could not be answered`)
  }
  const found = heldFor(index, address.pageTypeSlug, address.slug, asked)
  return textFor(found.value, INDEX_NAME, found.path, asked)
}

function attributesIn(held: Value): readonly string[] {
  const said = held[ATTRIBUTE_SLUGS]
  if (!Array.isArray(said)) return []
  return said.filter((one): one is string => typeof one === "string").map(slugOf)
}

function askingFor(index: Answering, kind: string, asked: string): Asking {
  const found = heldFor(index, GRAPH_EDGE, kind, asked)
  return {
    kind,
    indexName: indexNameFor(index, textFor(found.value, INDEX_SLUG, found.path, asked), asked),
    attributeSlugs: attributesIn(found.value),
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

function importsInto(
  index: Answering,
  path: string,
  asking: Asking,
  asked: string
): readonly Edge[] {
  const attribute = attributeFor(asking, asked)
  return index.importersOf(path).map((from) => ({
    kind: asking.kind,
    from,
    to: path,
    attrs: { [attribute]: BY_INDEX },
  }))
}

function loadedFrom(
  index: Answering,
  named: Named,
  to: string,
  asking: Asking,
  attribute: string
): readonly Edge[] {
  const type = index.listedByPath(named.path)[0]
  if (type === undefined) return []
  const filed = index.typeSlugById(type.id)
  if (filed === null) return []
  return index.everyOfType(filed).map((one) => ({
    kind: asking.kind,
    from: one.path,
    to,
    attrs: { [attribute]: named.propertySlug },
  }))
}

function relationsInto(
  index: Answering,
  path: string,
  asking: Asking,
  asked: string
): readonly Edge[] {
  const attribute = attributeFor(asking, asked)
  const found: Edge[] = []
  for (const one of index.listedByPath(path)) {
    for (const named of index.namersOf(one.id, asking.indexName)) {
      found.push({
        kind: asking.kind,
        from: named.path,
        to: one.path,
        attrs: { [attribute]: named.propertySlug },
      })
      if (named.propertySlug !== LOADED_BY) continue
      found.push(...loadedFrom(index, named, one.path, asking, attribute))
    }
  }
  return found
}

function keyOf(one: Edge): string {
  return [one.kind, one.from, one.to, JSON.stringify(one.attrs)].join(APART)
}

export function edgesInto(
  path: string,
  kinds: readonly string[],
  index: Answering
): readonly Edge[] {
  if (kinds.length === 0) return []
  const asked = askedFor(path, kinds)
  const found: Edge[] = []
  for (const kind of new Set(kinds)) {
    const asking = askingFor(index, kind, asked)
    if (kind === IMPORT_EDGE) found.push(...importsInto(index, path, asking, asked))
    else if (kind === RELATION) found.push(...relationsInto(index, path, asking, asked))
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
  paths: readonly string[],
  kinds: readonly string[],
  index: Answering,
  through: (path: string) => boolean = () => true
): readonly string[] {
  const found = new Set(paths.filter((one) => through(one)))
  const waiting = [...found]
  for (let one = waiting.pop(); one !== undefined; one = waiting.pop()) {
    for (const edge of edgesInto(one, kinds, index)) {
      if (found.has(edge.from) || !through(edge.from)) continue
      found.add(edge.from)
      waiting.push(edge.from)
    }
  }
  return [...found].sort()
}
