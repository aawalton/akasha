import type { PageType } from "@akasha/pages/page-type"

export const fandomCollection = {
  id: "01a06807-be66-7005-98c4-ddf6b3a89ca2",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "fandom-collection",
  definition: "a shelf of fandoms Alan keeps together",
  pluralSlug: "fandom-collections",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
