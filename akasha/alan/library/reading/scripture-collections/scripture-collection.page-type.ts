import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionExternal } from "../../../../collection-system/collection-externals/collection-external.page-type.ts"
import type { Title } from "../../../../temper/temper-things/properties/title.text-property.ts"

export type ScriptureCollection = CollectionExternal & {
  title: Title
}

export const scriptureCollection = {
  id: "01a06807-be66-7003-aba8-347b1f0d9f84",
  pageTypeSlug: "page-type",
  slug: "scripture-collection",
  definition: "a book of scripture Alan reads chapters of",
  pluralSlug: "scripture-collections",
  extendsSlug: "page-type/collection-external",
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
} as const satisfies PageType
