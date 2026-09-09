import type { PageType } from "@akasha/pages/page-type"
import type { CollectionExternal } from "../../../../collections/externals/collection-external.page-type.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"

export type ScriptureCollection = CollectionExternal & {
  title: Title
}

export const scriptureCollection = {
  id: "01a06807-be66-7003-aba8-347b1f0d9f84",
  pageTypeSlug: "page-type",
  slug: "scripture-collection",
  definition: "a book of scripture Alan reads chapters of",
  pluralSlug: "scripture-collections",
  extends: ["page-type/collection-external"],
  properties: [{ pagePropertySlug: "text-property/title", required: true, many: false }],
} as const satisfies PageType
