import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const resource = {
  id: "01a0c9d2-5f3d-7dd9-b045-d1b69e79a27a",
  type: "page-type/page-type",
  slug: "resource",
  definition: "something a character spends down and gets back",
  extends: ["page-type/page"],
  parts: [
    "number-property/resource-max-value",
    "number-property/resource-min-value",
    "number-property/resource-value",
  ],
  properties: [
    { pageProperty: "number-property/resource-value", required: true, many: false },
    { pageProperty: "number-property/resource-min-value", required: false, many: false },
    { pageProperty: "number-property/resource-max-value", required: false, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
