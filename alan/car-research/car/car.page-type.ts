import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const car = {
  id: "01a065a0-0000-7000-8000-000000000401",
  type: "page-type/page-type",
  slug: "car",
  definition: "a part of the catalogue of a company that makes cars",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "car" },
    { partOfSpeech: "part-of-speech/noun", spelling: "cars" },
  ],
  extends: ["page-type/page"],
  parts: ["boolean-property/short-list", "text-property/exclusion-reason", "text-property/sources"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "boolean-property/short-list", required: false, many: false },
    { pageProperty: "text-property/sources", required: false, many: false },
    { pageProperty: "text-property/exclusion-reason", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page type naming a level of a maker's catalogue builds on this page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level names the level above that level and never the levels below.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page is a car itself.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T04:56:19.712Z",
  updatedAt: "2026-10-30T15:19:00.095Z",
} as const satisfies PageType
