import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperSetCategory = {
  id: "01a05fd1-d441-711d-bcc5-d8bf635f2b8f",
  type: "page-type/page-type",
  slug: "temper-set-category",
  definition: "a set's source",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
