import { typeScripted } from "akasha/code/body/modules/file-kind/file-kind.module.code.ts"
import { importingIn } from "akasha/code/reading/modules/code-importing/code-importing.module.code.ts"
import type { Naming } from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"
import type { Known } from "akasha/graph/attribute/pages/known.graph-attribute.ts"
import type { Loading } from "akasha/graph/attribute/pages/loading.graph-attribute.ts"
import type { Names } from "akasha/graph/attribute/pages/names.graph-attribute.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import {
  type Body,
  reachingOf,
} from "akasha/page/index/modules/package-reaching/package-reaching.module.code.ts"
import {
  claimantOf,
  type Paging,
} from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import { namedOut } from "akasha/page/modules/reference-filing/page-reference-filing.module.code.ts"
import type { Named } from "akasha/page/modules/reference-reading/page-reference-reading.module.code.ts"
import {
  slugOf,
  textAt,
  typeIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const GRAPH_EDGE = "graph-edge"

const IMPORT_EDGE = "import-edge"

const RELATION = "relation"

const LOADED_BY = "loaded-by"

const PAGE_TYPE = "page-type"

const NO_ROWS = [] as const

const ATTRIBUTES = "attributes"

const ID = "id"

const APART = "\n"

const KNOWN = "known"

const LOADING = "loading"

const NAMES = "names"

const PROPERTY = "property"

const BY_REFERENCE: Known = "reference"

const BY_DECLARATION: Known = "declaration"

const NAMES_TYPE: Names = "type"

const NAMES_CODE: Names = "code"

const AT_LOAD: Loading = "at-load"

const DEFERRED: Loading = "deferred"

export type Edge = {
  readonly kind: string
  readonly from: string
  readonly to: string
  readonly attrs: Readonly<Record<string, string>>
}

type Asking = {
  readonly kind: string
  readonly attributes: readonly string[]
}

function namedIn(kinds: readonly string[]): string {
  return [...new Set(kinds)].sort().join(", ")
}

function askedFor(path: string, kinds: readonly string[]): string {
  return `what reaches \`${path}\` as ${namedIn(kinds)}`
}

function reachedFor(path: string, kinds: readonly string[]): string {
  return `what \`${path}\` reaches as ${namedIn(kinds)}`
}

type Held = {
  readonly path: string
  readonly value: Value
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

function attributesIn(held: Value): readonly string[] {
  const said = held[ATTRIBUTES]
  if (!Array.isArray(said)) return []
  return said.filter((one): one is string => typeof one === "string").map(slugOf)
}

function askingFor(index: Answering, kind: string, asked: string): Asking {
  const found = heldFor(index, GRAPH_EDGE, kind, asked)
  return { kind, attributes: attributesIn(found.value) }
}

function attributeNamed(asking: Asking, wanted: string, asked: string): string {
  if (!asking.attributes.includes(wanted)) {
    throw new Error(
      `the \`${asking.kind}\` edge carries no \`${wanted}\` attribute, so ${asked} could not be answered`
    )
  }
  return wanted
}

function importsInto(
  index: Answering,
  path: string,
  asking: Asking,
  asked: string
): readonly Edge[] {
  const attribute = attributeNamed(asking, KNOWN, asked)
  return index.importersOf(path).map((from) => ({
    kind: asking.kind,
    from,
    to: path,
    attrs: { [attribute]: BY_REFERENCE },
  }))
}

function namingFor(index: Answering, bodyAt: Body): Naming {
  return reachingOf(index.manifestsBeside(index.fileKeysAt()), bodyAt)
}

function importsOutOf(
  path: string,
  asking: Asking,
  asked: string,
  bodyAt: Body,
  naming: Naming
): readonly Edge[] {
  const known = attributeNamed(asking, KNOWN, asked)
  const names = attributeNamed(asking, NAMES, asked)
  const loading = attributeNamed(asking, LOADING, asked)
  if (!typeScripted(path)) return []
  const body = bodyAt(path)
  if (body === null) return []
  return importingIn(body, path, naming).map((one) => ({
    kind: asking.kind,
    from: path,
    to: one.at,
    attrs: {
      [known]: BY_DECLARATION,
      [names]: one.typed ? NAMES_TYPE : NAMES_CODE,
      [loading]: one.deferred ? DEFERRED : AT_LOAD,
    },
  }))
}

function loadedFrom(
  index: Answering,
  named: Named,
  to: string,
  asking: Asking,
  attribute: string
): readonly Edge[] {
  const value = index.pageByPath(named.path)
  const id = value === null ? null : textAt(value, ID)
  if (id === null) return []
  const filed = index.typeSlugById(id)
  if (filed === null) return []
  return index.everyOfType(filed).map((one) => ({
    kind: asking.kind,
    from: one.path,
    to,
    attrs: { [attribute]: named.propertySlug },
  }))
}

const NOWHERE: Paging = () => null

function relationsInto(
  index: Answering,
  path: string,
  asking: Asking,
  asked: string
): readonly Edge[] {
  const attribute = attributeNamed(asking, PROPERTY, asked)
  const to = claimantOf(
    NOWHERE,
    path,
    index.pageTypesIn(),
    index.filePropertiesAt(),
    index.folderPropertiesAt()
  )
  if (to === null) return []
  const value = index.pageByPath(to)
  const held = value === null ? null : textAt(value, ID)
  if (held === null) return []
  const found: Edge[] = []
  for (const named of index.namersOf(held)) {
    found.push({
      kind: asking.kind,
      from: named.path,
      to,
      attrs: { [attribute]: named.propertySlug },
    })
    if (named.propertySlug !== LOADED_BY) continue
    found.push(...loadedFrom(index, named, to, asking, attribute))
  }
  return found
}

function loadersOutOf(
  index: Answering,
  value: Value,
  path: string,
  asking: Asking,
  attribute: string
): readonly Edge[] {
  const own = typeIn(value)
  const held = own === null ? null : index.pageAt(PAGE_TYPE, own)
  if (held === null) return []
  const found: Edge[] = []
  for (const one of namedOut(held, index.knownIn(), NO_ROWS)) {
    if (one.propertySlug !== LOADED_BY) continue
    found.push({ kind: asking.kind, from: path, to: one.path, attrs: { [attribute]: LOADED_BY } })
  }
  return found
}

function relationsOutOf(
  index: Answering,
  path: string,
  asking: Asking,
  asked: string
): readonly Edge[] {
  const attribute = attributeNamed(asking, PROPERTY, asked)
  const value = index.pageByPath(path)
  if (value === null) return []
  const found = namedOut(value, index.knownIn(), NO_ROWS).map((one) => ({
    kind: asking.kind,
    from: path,
    to: one.path,
    attrs: { [attribute]: one.propertySlug },
  }))
  return [...found, ...loadersOutOf(index, value, path, asking, attribute)]
}

function keyOf(one: Edge): string {
  return [one.kind, one.from, one.to, JSON.stringify(one.attrs)].join(APART)
}

export function settledOf(found: readonly Edge[]): readonly Edge[] {
  const kept = new Map<string, Edge>()
  for (const one of found) kept.set(keyOf(one), one)
  return [...kept.values()].sort((one, two) => {
    const here = keyOf(one)
    const there = keyOf(two)
    return here < there ? -1 : here > there ? 1 : 0
  })
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
  return settledOf(found)
}

type Asked = {
  readonly asking: Asking
  readonly naming: Naming | null
}

function askedOut(kinds: readonly string[], index: Answering, bodyAt: Body): readonly Asked[] {
  const asked = `what a file reaches as ${namedIn(kinds)}`
  const every = [...new Set(kinds)].map((kind) => {
    const asking = askingFor(index, kind, asked)
    if (kind !== IMPORT_EDGE && kind !== RELATION) {
      throw new Error(
        `the \`${kind}\` edge is not yet read out of a node, so ${asked} could not be answered`
      )
    }
    return asking
  })
  const naming = every.some((one) => one.kind === IMPORT_EDGE) ? namingFor(index, bodyAt) : null
  return every.map((asking) => ({ asking, naming }))
}

function edgesOut(
  index: Answering,
  path: string,
  over: readonly Asked[],
  bodyAt: Body
): readonly Edge[] {
  const found: Edge[] = []
  for (const one of over) {
    const asked = reachedFor(path, [one.asking.kind])
    if (one.asking.kind === RELATION) {
      found.push(...relationsOutOf(index, path, one.asking, asked))
      continue
    }
    if (one.naming === null) continue
    found.push(...importsOutOf(path, one.asking, asked, bodyAt, one.naming))
  }
  return settledOf(found)
}

export type Stepping = (path: string) => readonly Edge[]

export function edgesOutOver(kinds: readonly string[], index: Answering, bodyAt: Body): Stepping {
  if (kinds.length === 0) return () => []
  const over = askedOut(kinds, index, bodyAt)
  return (path) => edgesOut(index, path, over, bodyAt)
}
