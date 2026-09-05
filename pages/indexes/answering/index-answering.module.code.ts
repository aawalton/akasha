import { kindsUnder } from "@akasha/pages-system/page-type-descent"
import {
  type Carried,
  carriedIn,
  declarationsOf,
  pageAt,
  propertiesIfNamedOf,
  propertiesOf,
  type Source,
  sourceIn,
} from "@akasha/pages-system/page-type-properties"
import type { Value } from "@akasha/pages-system/page-value"
import {
  entryShapesAt,
  type Schema as Filed,
  type FilePropertiesBy,
  fileKeysAt,
  filePropertiesAt,
  pageTypesIn,
  type SidecarsBy,
  schemaAt,
  sidecarsOver,
} from "../entries/index-entries.module.code.ts"
import {
  everyOfType,
  everyPath,
  idsNaming,
  importersOf,
  type Listed,
  listedAt,
  listedById,
  listedByPath,
  listedNamed,
  type Named,
  namersOf,
  type Schemad,
  schemaOf,
  typeSlugById,
  typeSlugOf,
} from "../index-reading/index-reading.module.code.ts"
import type { Reading } from "../index-shape/index-shape.module.code.ts"
import {
  carryingOf,
  type Declaring,
  declaringOf,
  type Carried as Reached,
} from "../property-carrying/property-carrying.module.code.ts"
import { knownIn, type Shaped } from "../reaching/reaching.module.code.ts"

export type PageOf = (path: string) => Value | null

export type Answering = {
  readonly carriedIn: (value: Value, declaredBy: string) => readonly Carried[]
  readonly carryingOf: (named: string) => Reached
  readonly declarationsOf: (pageTypeSlug: string) => readonly Carried[]
  readonly declaringOf: (id: string) => readonly Declaring[]
  readonly entryShapesAt: () => ReadonlySet<string>
  readonly everyOfType: (pageTypeSlug: string) => readonly Listed[]
  readonly everyPath: () => readonly string[]
  readonly fileKeysAt: () => ReadonlyMap<string, string | null>
  readonly filePropertiesAt: () => FilePropertiesBy
  readonly idsNaming: (id: string, propertySlug: string) => readonly string[]
  readonly importersOf: (path: string) => readonly string[]
  readonly kindsUnder: (slug: string) => ReadonlySet<string>
  readonly knownIn: () => Shaped
  readonly listedAt: (pageTypeSlug: string, slug: string) => readonly Listed[]
  readonly listedById: (id: string) => Listed | null
  readonly listedByPath: (path: string) => readonly Listed[]
  readonly listedNamed: (scope: string, propertySlug: string, said: string) => readonly Listed[]
  readonly namersOf: (id: string, indexName?: string) => readonly Named[]
  readonly pageAt: (pageTypeSlug: string, slug: string) => Value | null
  readonly pageTypesIn: () => ReadonlySet<string>
  readonly propertiesOf: (pageTypeSlug: string) => readonly Carried[]
  readonly propertiesIfNamed: (pageTypeSlug: string) => readonly Carried[] | null
  readonly schemaAt: () => ReadonlyMap<string, Filed>
  readonly sidecarsAt: () => SidecarsBy
  readonly schemaOf: (named: string) => Schemad
  readonly sourceIn: () => Source
  readonly typeSlugById: (id: string) => string | null
  readonly typeSlugOf: (id: string) => string
}

export function answeringOver(reading: Reading, root: string | null, pageOf: PageOf): Answering {
  return {
    carriedIn: (value, declaredBy) => carriedIn(value, reading, declaredBy),
    carryingOf: (named) => carryingOf(reading, named),
    declarationsOf: (pageTypeSlug) => declarationsOf(pageTypeSlug, reading, pageOf),
    declaringOf: (id) => declaringOf(reading, id),
    entryShapesAt: () => entryShapesAt(reading),
    everyOfType: (pageTypeSlug) => everyOfType(reading, pageTypeSlug),
    everyPath: () => everyPath(reading),
    fileKeysAt: () => fileKeysAt(reading),
    filePropertiesAt: () => filePropertiesAt(reading),
    idsNaming: (id, propertySlug) => idsNaming(reading, id, propertySlug),
    importersOf: (path) => importersOf(root, path, reading),
    kindsUnder: (slug) => kindsUnder(slug, reading, pageOf),
    knownIn: () => knownIn(reading, pageOf),
    listedAt: (pageTypeSlug, slug) => listedAt(reading, pageTypeSlug, slug),
    listedById: (id) => listedById(reading, id),
    listedByPath: (path) => listedByPath(reading, path),
    listedNamed: (scope, propertySlug, said) => listedNamed(reading, scope, propertySlug, said),
    namersOf: (id, indexName) => namersOf(reading, id, indexName),
    pageAt: (pageTypeSlug, slug) => pageAt(reading, pageTypeSlug, slug, pageOf),
    pageTypesIn: () => pageTypesIn(reading),
    propertiesOf: (pageTypeSlug) => propertiesOf(pageTypeSlug, reading, pageOf),
    propertiesIfNamed: (pageTypeSlug) => propertiesIfNamedOf(pageTypeSlug, reading, pageOf),
    schemaAt: () => schemaAt(reading),
    sidecarsAt: () => sidecarsOver(reading, []),
    schemaOf: (named) => schemaOf(reading, named),
    sourceIn: () => sourceIn(reading, pageOf),
    typeSlugById: (id) => typeSlugById(reading, id),
    typeSlugOf: (id) => typeSlugOf(reading, id),
  }
}
