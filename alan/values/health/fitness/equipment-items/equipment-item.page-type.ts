import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const equipmentItem = {
  id: "01a06834-ca86-76cb-a54a-6f86a5225afc",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "equipment-item",
  definition: "a piece of kit Alan can load a movement with",
  pluralSlug: "equipment-items",
  extends: ["page-type/page"],
  parts: [
    "boolean-property/equipment-available",
    "number-property/equipment-loads",
    "number-property/equipment-sort-order",
    "select-property/equipment-category",
    "select-property/equipment-configuration",
    "text-property/equipment-notes",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "select-property/equipment-category", required: true, many: false },
    { pageProperty: "select-property/equipment-configuration", required: true, many: false },
    { pageProperty: "boolean-property/equipment-available", required: true, many: false },
    {
      pageProperty: "number-property/equipment-loads",
      required: false,
      many: true,
      maxCount: 20,
    },
    { pageProperty: "text-property/equipment-notes", required: false, many: false },
    { pageProperty: "number-property/equipment-sort-order", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A piece of kit Alan owns is its own page.",
    },
    {
      invariantKind: "departure",
      statement: "The kit vocabulary a movement is tagged with is apart from those pages.",
    },
    {
      invariantKind: "departure",
      statement: "A piece Alan has not bought yet is a page.",
    },
    {
      invariantKind: "departure",
      statement: "A piece Alan has not bought yet is unavailable.",
    },
  ],
  types: "ts",
} as const satisfies PageType
