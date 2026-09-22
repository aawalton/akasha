import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const item = {
  id: "01a0ca42-3962-7211-864c-1c57568c322b",
  type: "page-type/page-type",
  slug: "item",
  definition: "something a character has",
  pluralSlug: "items",
  extends: ["page-type/page"],
  parts: ["relation-property/item-character", "relation-property/item-slot", "page-type/item-slot"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/item-character", required: true, many: false },
    { pageProperty: "relation-property/item-slot", required: false, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
