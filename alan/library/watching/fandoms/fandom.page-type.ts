import type { PageType } from "@akasha/pages/page-type"

export const fandom = {
  id: "01a06807-be66-7004-85ae-8df6ba0ad747",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "fandom",
  definition: "a world Alan follows across its shows and films",
  pluralSlug: "fandoms",
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
