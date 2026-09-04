import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionExternal } from "../../../../collection-system/collection-externals/collection-external.page-type.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"

export type ShowCollection = CollectionExternal & {
  title: Title
}

export const showCollection = {
  id: "01a06807-be66-7006-8d8a-389b26e79b07",
  pageTypeSlug: "page-type",
  slug: "show-collection",
  definition: "a shelf of shows Alan keeps together",
  pluralSlug: "show-collections",
  extendsSlug: "page-type/collection-external",
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
} as const satisfies PageType
