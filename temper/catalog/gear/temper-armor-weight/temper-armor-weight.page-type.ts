import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperArmorWeight = {
  id: "01a05fd1-d430-7564-8721-434ab188698f",
  type: "page-type/page-type",
  slug: "temper-armor-weight",
  definition: "how heavy a piece of armor is made",
  extends: ["page-type/temper-catalog-thing"],
  parts: [
    "boolean-property/is-standard",
    "number-property/armor-base-value",
    "number-property/crafted-glyph-item-id",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/armor-base-value", required: true, many: false },
    { pageProperty: "boolean-property/is-standard", required: true, many: false },
    { pageProperty: "relation-property/skill-line", required: true, many: false },
    { pageProperty: "number-property/crafted-glyph-item-id", required: false, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
