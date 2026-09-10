import type { PageType } from "@akasha/pages/page-type"

export const personaCraftDay = {
  id: "01a0655b-4a9b-700e-86cf-9bc6a7104f89",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "persona-craft-day",
  definition: "what the persona who makes personas did on one day",
  pluralSlug: "persona-craft-days",
  extends: ["page-type/page"],
  parts: [
    "number-property/advance-count",
    "number-property/green-day",
    "number-property/improvement-count",
    "number-property/new-persona-count",
    "relation-property/craft-day-persona",
    "relation-property/personas-crafted",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/craft-day-persona", required: true, many: false },
    { pageProperty: "text-property/date", required: true, many: false },
    { pageProperty: "text-property/value-slug", required: true, many: false },
    { pageProperty: "text-property/icon", required: false, many: false },
    {
      pageProperty: "relation-property/personas-crafted",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "number-property/new-persona-count", required: false, many: false },
    { pageProperty: "number-property/improvement-count", required: false, many: false },
    { pageProperty: "number-property/advance-count", required: false, many: false },
    { pageProperty: "number-property/green-day", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The persona named here did the crafting.",
    },
    {
      invariantKind: "departure",
      statement: "The personas crafted are named apart from the crafter.",
    },
    {
      invariantKind: "departure",
      statement: "A craft day is slugged by the crafter and then the day.",
    },
  ],
  types: "ts",
} as const satisfies PageType
