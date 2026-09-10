import type { PageType } from "@akasha/pages/page-type"

export const scriptureCollection = {
  id: "01a06807-be66-7003-aba8-347b1f0d9f84",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "scripture-collection",
  definition: "a book of scripture Alan reads chapters of",
  pluralSlug: "scripture-collections",
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
