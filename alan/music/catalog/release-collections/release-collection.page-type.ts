import type { PageType } from "@akasha/pages-system/page-type"
import type { Collection } from "../../../../collection-system/collections/collection.page-type.ts"
import type { Title } from "../../../../temper/temper-things/properties/title.text-property.ts"

export type ReleaseCollection = Collection & {
  title: Title
}

export const releaseCollection = {
  id: "01a06807-be66-7008-9e51-2703ac729611",
  pageTypeSlug: "page-type",
  slug: "release-collection",
  definition: "a shelf of releases Alan keeps together",
  pluralSlug: "release-collections",
  extendsSlug: "page-type/collection",
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
} as const satisfies PageType
