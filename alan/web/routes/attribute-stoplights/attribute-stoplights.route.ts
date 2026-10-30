import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const attributeStoplights = {
  id: "01a06858-8cfa-79e8-a5bc-b735b8f2f652",
  type: "page-type/route",
  slug: "attribute-stoplights",
  definition: "the points Alan earns for each attribute in a day",
  code: "ts",
  test: "ts",
  urlPath: "api/attribute-stoplights",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The group answered for here is the attributes group.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key each reading travels under is the one the group's page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tile shipped against this reads that key as text that is always there.",
    },
  ],
  createdAt: "2026-09-03T17:37:08.858Z",
  updatedAt: "2026-10-30T16:57:25.086Z",
} as const satisfies Route
