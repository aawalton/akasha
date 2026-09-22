import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperArmorTrait = {
  id: "01a05fb0-3ceb-7229-9089-127418274d52",
  type: "page-type/page-type",
  slug: "temper-armor-trait",
  definition: "a property worked into a piece of armor",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["relation-property/armor-trait"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/eso-trait-constant-name", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
