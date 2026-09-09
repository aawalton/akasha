import type { PageType } from "@akasha/pages/page-type"
import type { Collection } from "../../../../collections/collection.page-type.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"

export type ReleaseCollection = Collection & {
  title: Title
}

export const releaseCollection = {
  id: "01a06807-be66-7008-9e51-2703ac729611",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "release-collection",
  definition: "a shelf of releases Alan keeps together",
  pluralSlug: "release-collections",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
} as const satisfies PageType
