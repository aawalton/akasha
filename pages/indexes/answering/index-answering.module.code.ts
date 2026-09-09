import { kindsUnder } from "@akasha/pages/page-type-descent"
import {
  type Carried,
  carriedIn,
  declarationsOf,
  pageAt,
  propertiesIfNamedOf,
  propertiesOf,
  type Source,
  sourceIn,
} from "@akasha/pages/page-type-properties"
import type { Value } from "@akasha/pages/page-value"
import {
  entryShapesAt,
  type FilePropertiesBy,
  type FoldersBy,
  fileKeysAt,
  filePropertiesAt,
  folderPropertiesAt,
  pageTypesIn,
  schemaAt,
  type UncommittedBy,
  uncommittedFiledAt,
} from "../entries/index-entries.module.code.ts"
import { manifestsBeside } from "../package-reaching/package-reaching.module.code.ts"
import { type SidecarsBy, sidecarsOver } from "../path-claiming/path-claiming.module.code.ts"
import {
  carryingOf,
  type Declaring,
  declaringOf,
  type Carried as Reached,
} from "../property-carrying/property-carrying.module.code.ts"
import { knownIn, type Shaped } from "../reaching/reaching.module.code.ts"
import {
  everyOfType,
  everyPath,
  filesIn,
  foldersIn,
  idsNaming,
  importersOf,
  type Listed,
  listedAt,
  listedById,
  listedByPath,
  listedNamed,
  listedWithin,
  type Named,
  namersOf,
  type Schemad,
  schemaOf,
  slugsOfType,
  typeSlugById,
  typeSlugOf,
  valuesByPath,
} from "../reading/index-reading.module.code.ts"
import type { Schema as Filed, Reading } from "../shape/index-shape.module.code.ts"

export type PageOf = (path: string) => Value | null

export type Answering = {
  readonly carriedIn: (value: Value, declaredBy: string) => readonly Carried[]
  readonly carryingOf: (named: string) => Reached
  readonly declarationsOf: (pageTypeSlug: string) => readonly Carried[]
  readonly declaringOf: (id: string) => readonly Declaring[]
  readonly entryShapesAt: () => ReadonlySet<string>
  readonly everyOfType: (pageTypeSlug: string) => readonly Listed[]
  readonly everyPath: () => readonly string[]
  readonly filesIn: (folder: string) => readonly string[]
  readonly foldersIn: (folder: string) => readonly string[]
  readonly fileKeysAt: () => ReadonlyMap<string, string | null>
  readonly filePropertiesAt: () => FilePropertiesBy
  readonly folderPropertiesAt: () => FoldersBy
  readonly idsNaming: (id: string, propertySlug: string) => readonly string[]
  readonly importersOf: (path: string) => readonly string[]
  readonly kindsUnder: (slug: string) => ReadonlySet<string>
  readonly knownIn: () => Shaped
  readonly listedAt: (pageTypeSlug: string, slug: string) => readonly Listed[]
  readonly listedById: (id: string) => Listed | null
  readonly listedByPath: (path: string) => readonly Listed[]
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
  readonly namersOf: (id: string, indexName?: string) => readonly Named[]
  readonly pageAt: (pageTypeSlug: string, slug: string) => Value | null
  readonly pageByPath: (path: string) => Value | null
  readonly pageTypesIn: () => ReadonlySet<string>
  readonly propertiesOf: (pageTypeSlug: string) => readonly Carried[]
  readonly propertiesIfNamed: (pageTypeSlug: string) => readonly Carried[] | null
  readonly schemaAt: () => ReadonlyMap<string, Filed>
  readonly schemaOf: (named: string) => Schemad
  readonly sidecarsAt: () => SidecarsBy
  readonly slugsOfType: (pageTypeSlug: string) => readonly string[]
  readonly sourceIn: () => Source
  readonly typeSlugById: (id: string) => string | null
  readonly typeSlugOf: (id: string) => string
  readonly uncommittedFiledAt: () => UncommittedBy
  readonly valuesByPath: (pageTypeSlug: string) => ReadonlyMap<string, Value>
}

function heldOnce<T>(asked: () => T): () => T {
  let held: readonly [T] | null = null
  return () => {
    if (held === null) held = [asked()]
    return held[0]
  }
}

export function answeringOver(reading: Reading, pageOf: PageOf): Answering {
  return {
    carriedIn: (value, declaredBy) => carriedIn(value, reading, declaredBy),
    carryingOf: (named) => carryingOf(reading, named),
    declarationsOf: (pageTypeSlug) => declarationsOf(pageTypeSlug, reading, pageOf),
    declaringOf: (id) => declaringOf(reading, id),
    entryShapesAt: heldOnce(() => entryShapesAt(reading)),
    everyOfType: (pageTypeSlug) => everyOfType(reading, pageTypeSlug),
    everyPath: heldOnce(() => everyPath(reading)),
    filesIn: (folder) => filesIn(reading, folder),
    foldersIn: (folder) => foldersIn(reading, folder),
    fileKeysAt: heldOnce(() => fileKeysAt(reading)),
    filePropertiesAt: heldOnce(() => filePropertiesAt(reading)),
    folderPropertiesAt: heldOnce(() => folderPropertiesAt(reading)),
    idsNaming: (id, propertySlug) => idsNaming(reading, id, propertySlug),
    importersOf: (path) => importersOf(path, reading),
    kindsUnder: (slug) => kindsUnder(slug, reading, pageOf),
    knownIn: heldOnce(() => knownIn(reading, pageOf)),
    listedAt: (pageTypeSlug, slug) => listedAt(reading, pageTypeSlug, slug),
    listedById: (id) => listedById(reading, id),
    listedByPath: (path) => listedByPath(reading, path),
    listedNamed: (uniqueKind, scope, propertySlug, said) =>
      listedNamed(reading, uniqueKind, scope, propertySlug, said),
    listedWithin: (pageTypeSlug, scopePropertySlug, scopeValue, propertySlug, said) =>
      listedWithin(reading, pageTypeSlug, scopePropertySlug, scopeValue, propertySlug, said),
    manifestsBeside: (fileProperties) => manifestsBeside(reading, fileProperties),
    namersOf: (id, indexName) => namersOf(reading, id, indexName),
    pageAt: (pageTypeSlug, slug) => pageAt(reading, pageTypeSlug, slug, pageOf),
    pageByPath: (path) => pageOf(path),
    pageTypesIn: heldOnce(() => pageTypesIn(reading)),
    propertiesOf: (pageTypeSlug) => propertiesOf(pageTypeSlug, reading, pageOf),
    propertiesIfNamed: (pageTypeSlug) => propertiesIfNamedOf(pageTypeSlug, reading, pageOf),
    schemaAt: heldOnce(() => schemaAt(reading)),
    schemaOf: (named) => schemaOf(reading, named),
    sidecarsAt: heldOnce(() => sidecarsOver(reading, [])),
    slugsOfType: (pageTypeSlug) => slugsOfType(reading, pageTypeSlug),
    sourceIn: heldOnce(() => sourceIn(reading, pageOf)),
    typeSlugById: (id) => typeSlugById(reading, id),
    typeSlugOf: (id) => typeSlugOf(reading, id),
    uncommittedFiledAt: heldOnce(() => uncommittedFiledAt(reading)),
    valuesByPath: (pageTypeSlug) => valuesByPath(reading, pageTypeSlug),
  }
}
