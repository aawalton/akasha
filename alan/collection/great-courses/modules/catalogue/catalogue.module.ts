import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const catalogue = {
  id: "01a06579-f3d9-7001-8e82-d6a75a254ea0",
  type: "page-type/module",
  slug: "catalogue",
  definition:
    "the Great Courses programme listing fetched and turned into courses and subject shelves",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One fetch of the listing answers for both the courses and the subjects.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link leaving the listing's own origin is no course.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A course is identified by the last segment of its own URL.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The listing's style blocks are taken out before the listing is parsed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is read off the listing is its elements, so its styling is read by nothing.",
    },
  ],
} as const satisfies Module
