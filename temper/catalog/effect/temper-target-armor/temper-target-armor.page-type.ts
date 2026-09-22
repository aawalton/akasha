import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperTargetArmor = {
  id: "01a05fc5-94d1-784f-81dd-52ce5bc412dd",
  type: "page-type/page-type",
  slug: "temper-target-armor",
  definition: "a sort of enemy against which damage is worked out",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["number-property/armor"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/armor", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
