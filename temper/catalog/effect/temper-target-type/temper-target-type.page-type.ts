import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperTargetType = {
  id: "01a05fc5-94d2-7f4f-9b3c-6c27e1c09266",
  type: "page-type/page-type",
  slug: "temper-target-type",
  definition: "an ability's target",
  extends: ["page-type/temper-catalog-thing"],
  properties: [{ pageProperty: "text-property/key", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
