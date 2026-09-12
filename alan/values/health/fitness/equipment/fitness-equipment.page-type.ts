import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const fitnessEquipment = {
  id: "01a06834-ca86-76cb-a54a-6f86a5225afc",
  type: "page-type",
  slug: "fitness-equipment",
  definition: "a piece of kit Alan can load a movement with",
  pluralSlug: "fitness-equipment",
  extends: ["page-type/page"],
  parts: [
    "boolean-property/fitness-equipment-available",
    "number-property/fitness-equipment-loads",
    "number-property/fitness-equipment-sort-order",
    "select-property/fitness-equipment-category",
    "select-property/fitness-equipment-configuration",
    "text-property/fitness-equipment-notes",
    "select-property/fitness-equipment-covers",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "select-property/fitness-equipment-category", required: true, many: false },
    {
      pageProperty: "select-property/fitness-equipment-configuration",
      required: true,
      many: false,
    },
    { pageProperty: "boolean-property/fitness-equipment-available", required: true, many: false },
    {
      pageProperty: "number-property/fitness-equipment-loads",
      required: false,
      many: true,
      maxCount: 20,
    },
    { pageProperty: "text-property/fitness-equipment-notes", required: false, many: false },
    { pageProperty: "number-property/fitness-equipment-sort-order", required: false, many: false },
    {
      pageProperty: "select-property/fitness-equipment-covers",
      required: false,
      many: true,
      maxCount: null,
    },
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
