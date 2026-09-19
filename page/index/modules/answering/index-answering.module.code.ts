import {
  type SidecarsBy,
  sidecarsOver,
} from "akasha/page/index/modules/beside-declaring/beside-declaring.module.code.ts"
import {
  type ExtensionsBy,
  entryShapesAt,
  extensionPropertiesAt,
  type FilePropertiesBy,
  type FoldersBy,
  fileKeysAt,
  filePropertiesAt,
  folderPropertiesAt,
  pageTypesIn,
  type UncommittedBy,
  uncommittedFiledAt,
} from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { manifestsBeside } from "akasha/page/index/modules/package-reaching/package-reaching.module.code.ts"
import {
  carryingOf,
  type Carried as Reached,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import {
  type Declaring,
  declaringOf,
} from "akasha/page/index/modules/property-declaring/property-declaring.module.code.ts"
import { shapesAt } from "akasha/page/index/modules/property-shaping/property-shaping.module.code.ts"
import { knownIn, type Shaped } from "akasha/page/index/modules/reaching/reaching.module.code.ts"
import {
  everyOfType,
  type Listed,
  listedAt,
  listedById,
  listedNamed,
  listedWithin,
  slugsOfType,
  typeSlugById,
  typeSlugOf,
  valuesByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type {
  Shape as Filed,
  Reading,
} from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  idsNaming,
  importersOf,
  type Named,
  namersAt,
  namersOf,
} from "akasha/page/modules/reference-reading/page-reference-reading.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  type Carried,
  carriedIn,
  declarationsOf,
  membersIfNamedOf,
  pageAt,
  propertiesIfNamedOf,
  propertiesOf,
  type Source,
  sourceIn,
} from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"
import { kindsUnder } from "akasha/page/type/modules/descent/page-type-descent.module.code.ts"

export type PageOf = (path: string) => Value | null

export type Answering = {
  readonly carriedIn: (value: Value, declaredBy: string) => readonly Carried[]
  readonly carryingOf: (named: string) => Reached
  readonly declarationsOf: (pageTypeSlug: string) => readonly Carried[]
  readonly declaringOf: (id: string) => readonly Declaring[]
  readonly entryShapesAt: () => ReadonlySet<string>
  readonly everyOfType: (pageTypeSlug: string) => readonly Listed[]
  readonly extensionPropertiesAt: () => ExtensionsBy
  readonly fileKeysAt: () => ReadonlyMap<string, string | null>
  readonly filePropertiesAt: () => FilePropertiesBy
  readonly folderPropertiesAt: () => FoldersBy
  readonly idsNaming: (id: string, propertySlug: string) => readonly string[]
  readonly importersOf: (path: string) => readonly string[]
  readonly kindsUnder: (slug: string) => ReadonlySet<string>
  readonly knownIn: () => Shaped
  readonly listedAt: (pageTypeSlug: string, slug: string) => readonly Listed[]
  readonly listedById: (id: string) => Listed | null
  readonly listedNamed: (
    uniqueKind: string,
    scope: string,
    propertySlug: string,
    said: string
  ) => readonly Listed[]
  readonly listedWithin: (
    pageTypeSlug: string,
    scopePropertySlug: string,
    scopeValue: string,
    propertySlug: string,
    said: string
  ) => readonly Listed[]
  readonly manifestsBeside: (
    fileProperties: ReadonlyMap<string, string | null>
  ) => readonly string[]
  readonly membersIfNamed: (pageTypeSlug: string) => readonly Carried[] | null
  readonly namersAt: (pagePath: string) => readonly Named[]
  readonly namersOf: (id: string) => readonly Named[]
  readonly pageAt: (pageTypeSlug: string, slug: string) => Value | null
  readonly pageByPath: (path: string) => Value | null
  readonly pageTypesIn: () => ReadonlySet<string>
  readonly propertiesOf: (pageTypeSlug: string) => readonly Carried[]
  readonly propertiesIfNamed: (pageTypeSlug: string) => readonly Carried[] | null
  readonly shapesAt: () => ReadonlyMap<string, Filed>
  readonly sidecarsAt: () => SidecarsBy
  readonly slugsOfType: (pageTypeSlug: string) => readonly string[]
  readonly sourceIn: () => Source
  readonly typeSlugById: (id: string) => string | null
  readonly typeSlugOf: (id: string) => string
  readonly uncommittedFiledAt: () => UncommittedBy
  readonly valueAt: (path: string) => Value | null
  readonly valuesByPath: (pageTypeSlug: string) => ReadonlyMap<string, Value>
}

function heldOnce<T>(asked: () => T): () => T {
  let held: readonly [T] | null = null
  return () => {
    if (held === null) held = [asked()]
    return held[0]
  }
}

function heldPerName<T>(asked: (named: string) => T): (named: string) => T {
  const held = new Map<string, T>()
  return (named) => {
    const found = held.get(named)
    if (found !== undefined) return found
    const made = asked(named)
    held.set(named, made)
    return made
  }
}

export function answeringOver(reading: Reading, pageOf: PageOf): Answering {
  return {
    carriedIn: (value, declaredBy) => carriedIn(value, reading, declaredBy),
    carryingOf: heldPerName((named) => carryingOf(reading, named)),
    declarationsOf: (pageTypeSlug) => declarationsOf(pageTypeSlug, reading, pageOf),
    declaringOf: (id) => declaringOf(reading, id),
    entryShapesAt: heldOnce(() => entryShapesAt(reading)),
    everyOfType: (pageTypeSlug) => everyOfType(reading, pageTypeSlug),
    extensionPropertiesAt: heldOnce(() => extensionPropertiesAt(reading)),
    fileKeysAt: heldOnce(() => fileKeysAt(reading)),
    filePropertiesAt: heldOnce(() => filePropertiesAt(reading)),
    folderPropertiesAt: heldOnce(() => folderPropertiesAt(reading)),
    idsNaming: (id, propertySlug) => idsNaming(reading, id, propertySlug),
    importersOf: (path) => importersOf(reading, path),
    kindsUnder: (slug) => kindsUnder(slug, reading),
    knownIn: heldOnce(() => knownIn(reading, pageOf)),
    listedAt: (pageTypeSlug, slug) => listedAt(reading, pageTypeSlug, slug),
    listedById: (id) => listedById(reading, id),
    listedNamed: (uniqueKind, scope, propertySlug, said) =>
      listedNamed(reading, uniqueKind, scope, propertySlug, said),
    listedWithin: (pageTypeSlug, scopePropertySlug, scopeValue, propertySlug, said) =>
      listedWithin(reading, pageTypeSlug, scopePropertySlug, scopeValue, propertySlug, said),
    manifestsBeside: (fileProperties) => manifestsBeside(reading, fileProperties),
    membersIfNamed: (pageTypeSlug) => membersIfNamedOf(pageTypeSlug, reading, pageOf),
    namersAt: (pagePath) => namersAt(reading, pagePath),
    namersOf: (id) => namersOf(reading, id),
    pageAt: (pageTypeSlug, slug) => pageAt(reading, pageTypeSlug, slug, pageOf),
    pageByPath: (path) => pageOf(path),
    pageTypesIn: heldOnce(() => pageTypesIn(reading)),
    propertiesOf: (pageTypeSlug) => propertiesOf(pageTypeSlug, reading, pageOf),
    propertiesIfNamed: (pageTypeSlug) => propertiesIfNamedOf(pageTypeSlug, reading, pageOf),
    shapesAt: heldOnce(() => shapesAt(reading)),
    sidecarsAt: heldOnce(() => sidecarsOver(reading, [])),
    slugsOfType: (pageTypeSlug) => slugsOfType(reading, pageTypeSlug),
    sourceIn: heldOnce(() => sourceIn(reading, pageOf)),
    typeSlugById: (id) => typeSlugById(reading, id),
    typeSlugOf: (id) => typeSlugOf(reading, id),
    uncommittedFiledAt: heldOnce(() => uncommittedFiledAt(reading)),
    valueAt: (path) => pageOf(path),
    valuesByPath: (pageTypeSlug) => valuesByPath(reading, pageTypeSlug),
  }
}
