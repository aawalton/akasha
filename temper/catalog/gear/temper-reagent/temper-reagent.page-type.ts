import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperReagent = {
  id: "01a05fd1-d440-7e50-9ee1-512f735a1900",
  type: "page-type/page-type",
  slug: "temper-reagent",
  definition: "a plant or part brewed into a drink",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["multi-relation-property/alchemy-effects"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/icon", required: true, many: false },
    { pageProperty: "number-property/item-id", required: true, many: false },
    {
      pageProperty: "multi-relation-property/alchemy-effects",
      required: true,
      many: true,
      maxCount: null,
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
