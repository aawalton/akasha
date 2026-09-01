import { kindsUnder } from "@akasha/pages-system/page-type-descent"
import {
  type Carried,
  carriedIn,
  declarationsOf,
  pageAt,
  propertiesOf,
  type Source,
  sourceIn,
} from "@akasha/pages-system/page-type-properties"
import type { Value } from "@akasha/pages-system/page-value"
import {
  type Schema as Filed,
  filePropertiesAt,
  pageTypesIn,
  schemaAt,
} from "../index-entries/index-entries.module.code.ts"
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
import { type Declaring, declaringOf } from "../property-carrying/property-carrying.module.code.ts"
import { knownIn, type Shaped } from "../reaching/reaching.module.code.ts"

export type PageOf = (path: string) => Value | null

export type Answering = {
  readonly carriedIn: (value: Value, declaredBy: string) => readonly Carried[]
  readonly declarationsOf: (pageTypeSlug: string, pageOf: PageOf) => readonly Carried[]
  readonly declaringOf: (id: string) => readonly Declaring[]
  readonly everyOfType: (pageTypeSlug: string) => readonly Listed[]
  readonly everyPath: () => readonly string[]
  readonly filePropertiesAt: () => ReadonlyMap<string, string | null>
  readonly idsNaming: (id: string, propertySlug: string) => readonly string[]
  readonly importersOf: (root: string, path: string) => readonly string[]
  readonly kindsUnder: (root: string, slug: string, pageOf?: PageOf) => ReadonlySet<string>
  readonly knownIn: (repo: string, pageOf?: PageOf) => Shaped
  readonly listedAt: (pageTypeSlug: string, slug: string) => readonly Listed[]
  readonly listedById: (id: string) => Listed | null
  readonly listedByPath: (path: string) => readonly Listed[]
  readonly listedNamed: (scope: string, propertySlug: string, said: string) => readonly Listed[]
  readonly namersOf: (id: string, indexName?: string) => readonly Named[]
  readonly pageAt: (pageTypeSlug: string, slug: string, pageOf: PageOf) => Value | null
  readonly pageTypesIn: () => ReadonlySet<string>
  readonly propertiesOf: (pageTypeSlug: string, pageOf: PageOf) => readonly Carried[]
  readonly schemaAt: () => ReadonlyMap<string, Filed>
  readonly schemaOf: (named: string) => Schemad
  readonly sourceIn: (pageOf: PageOf) => Source
  readonly typeSlugById: (id: string) => string | null
  readonly typeSlugOf: (id: string) => string
}

export function answeringOver(reading: Reading): Answering {
  return {
    carriedIn: (value, declaredBy) => carriedIn(value, reading, declaredBy),
    declarationsOf: (pageTypeSlug, pageOf) => declarationsOf(pageTypeSlug, reading, pageOf),
    declaringOf: (id) => declaringOf(reading, id),
    everyOfType: (pageTypeSlug) => everyOfType(reading, pageTypeSlug),
    everyPath: () => everyPath(reading),
    filePropertiesAt: () => filePropertiesAt(reading),
    idsNaming: (id, propertySlug) => idsNaming(reading, id, propertySlug),
    importersOf: (root, path) => importersOf(root, path, reading),
    kindsUnder: (root, slug, pageOf) => kindsUnder(root, slug, reading, pageOf),
    knownIn: (repo, pageOf) => knownIn(reading, repo, pageOf),
    listedAt: (pageTypeSlug, slug) => listedAt(reading, pageTypeSlug, slug),
    listedById: (id) => listedById(reading, id),
    listedByPath: (path) => listedByPath(reading, path),
    listedNamed: (scope, propertySlug, said) => listedNamed(reading, scope, propertySlug, said),
    namersOf: (id, indexName) => namersOf(reading, id, indexName),
    pageAt: (pageTypeSlug, slug, pageOf) => pageAt(reading, pageTypeSlug, slug, pageOf),
    pageTypesIn: () => pageTypesIn(reading),
    propertiesOf: (pageTypeSlug, pageOf) => propertiesOf(pageTypeSlug, reading, pageOf),
    schemaAt: () => schemaAt(reading),
    schemaOf: (named) => schemaOf(reading, named),
    sourceIn: (pageOf) => sourceIn(reading, pageOf),
    typeSlugById: (id) => typeSlugById(reading, id),
    typeSlugOf: (id) => typeSlugOf(reading, id),
  }
}
