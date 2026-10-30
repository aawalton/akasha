import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const relationshipDeposit = {
  id: "01a0658d-16bc-7759-82e4-2d059f33ac84",
  type: "page-type/page-type",
  slug: "relationship-deposit",
  definition: "a thing Alan did that put something into a relationship",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "relationship deposit" },
    { partOfSpeech: "part-of-speech/noun", spelling: "relationship deposits" },
  ],
  extends: ["page-type/page"],
  parts: [
    "calendar-date-property/relationship-deposit-date",
    "relation-property/relationship-deposit-persona",
    "relation-property/relationship-deposit-relationship",
    "relation-property/relationship-deposit-value",
    "select-property/relationship-deposit-size",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    {
      pageProperty: "calendar-date-property/relationship-deposit-date",
      required: true,
      many: false,
    },
    {
      pageProperty: "relation-property/relationship-deposit-persona",
      required: true,
      many: false,
    },
    {
      pageProperty: "relation-property/relationship-deposit-relationship",
      required: true,
      many: false,
    },
    { pageProperty: "select-property/relationship-deposit-size", required: true, many: false },
    {
      pageProperty: "relation-property/relationship-deposit-value",
      required: true,
      many: false,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A deposit names the relationship that deposit went into rather than a person.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deposit names the value that deposit served.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T04:35:40.348Z",
  updatedAt: "2026-10-30T16:22:16.344Z",
} as const satisfies PageType
