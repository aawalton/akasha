import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperPoisonEffect = {
  id: "01a05fd1-d434-7ecc-bbf1-c13d68007b96",
  type: "page-type/page-type",
  slug: "temper-poison-effect",
  definition: "an effect a reagent lends what it is brewed into",
  extends: ["page-type/temper-gear-thing"],
  parts: ["boolean-property/is-positive", "number-property/cooldown", "text-property/opposite-id"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/opposite-id", required: true, many: false },
    { pageProperty: "boolean-property/is-positive", required: false, many: false },
    { pageProperty: "number-property/cooldown", required: false, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
