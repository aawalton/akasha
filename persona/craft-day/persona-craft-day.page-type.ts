import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const personaCraftDay = {
  id: "01a0655b-4a9b-700e-86cf-9bc6a7104f89",
  type: "page-type/page-type",
  slug: "persona-craft-day",
  definition: "what the persona who makes personas did on a day",
  extends: ["page-type/page"],
  parts: [
    "number-property/advance-count",
    "number-property/green-day",
    "number-property/improvement-count",
    "number-property/new-persona-count",
    "relation-property/craft-day-persona",
    "multi-relation-property/personas-crafted",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/craft-day-persona", required: true, many: false },
    { pageProperty: "calendar-date-property/date", required: true, many: false },
    { pageProperty: "relation-property/page-value", required: true, many: false },
    {
      pageProperty: "multi-relation-property/personas-crafted",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "number-property/new-persona-count", required: false, many: false },
    { pageProperty: "number-property/improvement-count", required: false, many: false },
    { pageProperty: "number-property/advance-count", required: false, many: false },
    { pageProperty: "number-property/green-day", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The persona named here did the crafting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The personas crafted are named apart from the crafter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A craft day is slugged by the crafter and then the day.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
