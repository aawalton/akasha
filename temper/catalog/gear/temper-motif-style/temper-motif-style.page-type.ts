import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperMotifStyle = {
  id: "01a05fd1-d433-75e8-b089-3c870c7d6917",
  type: "page-type/page-type",
  slug: "temper-motif-style",
  definition: "a crafting style giving a piece its look",
  extends: ["page-type/temper-catalog-thing"],
  parts: [
    "number-property/collection-index",
    "multi-relation-property/drop-sources",
    "number-property/eso-item-style-id",
    "text-property/source-description",
    "text-property/style-name",
  ],
  properties: [
    { pageProperty: "number-property/eso-item-style-id", required: false, many: false },
    { pageProperty: "text-property/style-name", required: false, many: false },
    { pageProperty: "number-property/collection-index", required: false, many: false },
    { pageProperty: "text-property/source-description", required: false, many: false },
    {
      pageProperty: "multi-relation-property/drop-sources",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
