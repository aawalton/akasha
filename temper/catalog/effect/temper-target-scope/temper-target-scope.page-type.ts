import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperTargetScope = {
  id: "01a05fc5-94d1-7137-9597-c8f6faef3147",
  type: "page-type/page-type",
  slug: "temper-target-scope",
  definition: "the shape of ground an ability covers",
  extends: ["page-type/temper-catalog-thing"],
  properties: [{ pageProperty: "text-property/key", required: true, many: false }],
  parts: ["change-generator/target-scope-ids-keeping", "data-table/target-scope-ids"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
