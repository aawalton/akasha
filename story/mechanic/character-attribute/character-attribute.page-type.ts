import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const characterAttribute = {
  id: "01a0c9f6-f0c6-7de0-acb3-6f5f9252d4e2",
  type: "page-type/page-type",
  slug: "character-attribute",
  definition: "a number for a persistent property of a character",
  pluralSlug: "attributes",
  extends: ["page-type/mechanic"],
  parts: ["number-property/attribute-value", "relation-property/attribute-character"],
  properties: [
    { pageProperty: "relation-property/attribute-character", required: true, many: false },
    { pageProperty: "number-property/attribute-value", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
