import {
  slugOf,
  textAt,
  type Value,
  valueAt,
} from "../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  importersOf,
  indexAt,
  type Standing,
  standingAt,
  standingByPath,
} from "../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import {
  type Reading,
  readingAt,
} from "../../pages-system/indexes/index-surface/index-surface.module.code.ts"
import { addressIn } from "../../pages-system/page/page-address/page-address.module.code.ts"

const GRAPH_EDGE = "graph-edge"

const IMPORT = "import"

const RELATION = "relation"

const INDEX_SLUG = "indexSlug"

const INDEX_NAME = "indexName"

const ATTRIBUTE_SLUGS = "attributeSlugs"

const AT_PATH = "path"

const AT_PAGE = "page"

const AT_ID = "id"

const ENDING = ".jsonl"

const APART = "\n"

const NAMING_NONE = "an index that is missing is not an index naming no edge"

const NO_ATTRIBUTES: Readonly<Record<string, string>> = {}

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

function standingFor(root: string, pageTypeSlug: string, slug: string, asked: string): Standing {
  const found = standingAt(root, pageTypeSlug, slug)[0]
  if (found === undefined) {
    throw new Error(
      `no \`${pageTypeSlug}\` page is slugged \`${slug}\`, so ${asked} could not be answered`
    )
  }
  return found
}

function indexNameFor(root: string, named: string, asked: string): string {
  const address = addressIn(named)
  if (address.kind !== "qualified") {
    throw new Error(`\`${named}\` names no page type, so ${asked} could not be answered`)
  }
  const found = standingFor(root, address.pageTypeSlug, address.slug, asked)
  return textFor(valueFor(root, found.path, asked), INDEX_NAME, found.path, asked)
}

function attributesIn(held: Value): readonly string[] {
  const said = held[ATTRIBUTE_SLUGS]
  if (!Array.isArray(said)) return []
  return said.filter((one): one is string => typeof one === "string").map(slugOf)
}

function askingFor(root: string, kind: string, asked: string): Asking {
  const found = standingFor(root, GRAPH_EDGE, kind, asked)
  const held = valueFor(root, found.path, asked)
  return {
    kind,
    indexName: indexNameFor(root, textFor(held, INDEX_SLUG, found.path, asked), asked),
    attributeSlugs: attributesIn(held),
  }
}

function filedUnder(reading: Reading, at: string, asked: string): string {
  if (reading.holds(at)) return at
  throw new Error(`\`${at}\` is not there, so ${asked} could not be answered — ${NAMING_NONE}`)
}

function importsInto(
  root: string,
  reading: Reading,
  path: string,
  asking: Asking,
  asked: string
): readonly Edge[] {
  filedUnder(reading, indexAt(asking.indexName, AT_PATH), asked)
  return importersOf(root, path).map((from) => ({
    kind: asking.kind,
    from,
    to: path,
    attrs: NO_ATTRIBUTES,
  }))
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
  root: string,
  reading: Reading,
  path: string,
  asking: Asking,
  asked: string
): readonly Edge[] {
  const under = filedUnder(reading, indexAt(asking.indexName, AT_PAGE, AT_ID), asked)
  const attribute = attributeFor(asking, asked)
  const found: Edge[] = []
  for (const one of standingByPath(root, path)) {
    if (one.path !== path) continue
    const here = `${under}/${one.id}`
    for (const property of reading.listing(here)) {
      if (!property.directory) continue
      for (const from of sourcesUnder(reading, `${here}/${property.name}`)) {
        found.push({
          kind: asking.kind,
          from,
          to: path,
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

export function edgesInto(root: string, path: string, kinds: readonly string[]): readonly Edge[] {
  if (kinds.length === 0) return []
  const asked = askedFor(path, kinds)
  const reading = readingAt(root)
  const found: Edge[] = []
  for (const kind of new Set(kinds)) {
    const asking = askingFor(root, kind, asked)
    if (kind === IMPORT) found.push(...importsInto(root, reading, path, asking, asked))
    else if (kind === RELATION) found.push(...relationsInto(root, reading, path, asking, asked))
    else {
      throw new Error(
        `the \`${kind}\` edge is not yet read into a node, so ${asked} could not be answered`
      )
    }
  }
  return found.sort((one, two) => {
    const here = keyOf(one)
    const there = keyOf(two)
    return here < there ? -1 : here > there ? 1 : 0
  })
}

export function reachingInto(
  root: string,
  paths: readonly string[],
  kinds: readonly string[],
  through: (path: string) => boolean = () => true
): readonly string[] {
  const found = new Set(paths.filter((one) => through(one)))
  const waiting = [...found]
  for (let one = waiting.pop(); one !== undefined; one = waiting.pop()) {
    for (const edge of edgesInto(root, one, kinds)) {
      if (found.has(edge.from) || !through(edge.from)) continue
      found.add(edge.from)
      waiting.push(edge.from)
    }
  }
  return [...found].sort()
}
