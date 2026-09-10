import type { PageType } from "@akasha/pages/page-type"

export const foodEntry = {
  id: "01a065a3-6e8b-7516-be17-9b2737f11128",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "food-entry",
  definition: "one thing Alan ate, written down",
  pluralSlug: "food-entries",
  extends: ["page-type/page"],
  parts: [
    "file-property/food-entry-note",
    "instant-property/happened-at",
    "number-property/estimated-calories",
    "number-property/plant-grams",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "instant-property/happened-at", required: true, many: false },
    { pageProperty: "number-property/plant-grams", required: false, many: false },
    { pageProperty: "number-property/estimated-calories", required: false, many: false },
    { pageProperty: "file-property/food-entry-note", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One file has one thing eaten.",
    },
    {
      invariantKind: "departure",
      statement:
        "The day a food entry counts to is worked out from the instant that entry happened at.",
    },
    {
      invariantKind: "absence",
      statement: "A food entry that contributes no plants has no plant grams rather than a zero.",
    },
    {
      invariantKind: "gap",
      statement: "Every food entry Alan logs lands in a file.",
    },
  ],
  types: "ts",
} as const satisfies PageType
