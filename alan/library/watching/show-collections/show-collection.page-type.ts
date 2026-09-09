import type { PageType } from "@akasha/pages/page-type"
import type { CollectionExternal } from "../../../../collections/externals/collection-external.page-type.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"

export type ShowCollection = CollectionExternal & {
  title: Title
}

export const showCollection = {
  id: "01a06807-be66-7006-8d8a-389b26e79b07",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "show-collection",
  definition: "a shelf of shows Alan keeps together",
  pluralSlug: "show-collections",
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
} as const satisfies PageType
