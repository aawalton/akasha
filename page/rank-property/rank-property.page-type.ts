import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const rankProperty = {
  id: "01a063de-2c60-7004-81e6-21e2564b7832",
  type: "page-type/page-type",
  slug: "rank-property",
  definition: "a page property with a rung on a ladder of grades",
  extends: ["page-type/select-property"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The ladder runs from `F` up to `S+`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung above another rung is a better grade.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rank property states the whole ladder as its values.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ladder is the values a rank property states rather than a second list here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung is read off a rank property's own file.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Nothing refuses a rank property whose values are not the ladder.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
