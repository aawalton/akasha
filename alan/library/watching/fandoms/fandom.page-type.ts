import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionExternal } from "../../../../collection-system/collection-externals/collection-external.page-type.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"

export type Fandom = CollectionExternal & {
  title: Title
}

export const fandom = {
  id: "01a06807-be66-7004-85ae-8df6ba0ad747",
  pageTypeSlug: "page-type",
  slug: "fandom",
  definition: "a world Alan follows across its shows and films",
  pluralSlug: "fandoms",
  extendsSlug: ["page-type/collection-external"],
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
} as const satisfies PageType
