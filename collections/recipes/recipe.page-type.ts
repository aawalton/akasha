import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const recipe = {
  id: "01a06807-be66-700f-92e8-bca7096b21be",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "recipe",
  definition: "a dish Alan cooks",
  pluralSlug: "recipes",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
