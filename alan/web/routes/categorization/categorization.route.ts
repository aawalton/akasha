import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const categorization = {
  id: "01a08241-5c83-7f0f-9096-69b7da0a19b7",
  type: "page-type/route",
  slug: "categorization",
  definition: "how many Monarch transactions of a year wait for a person",
  code: "ts",
  urlPath: "api/categorization",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The readout served is the one whose page names this route.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key the reading travels under is read off that readout's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The scale the reading is drawn against is read off that readout's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words for an empty reading are read off that readout's page.",
    },
  ],
  createdAt: "2026-09-08T18:21:56.739Z",
  updatedAt: "2026-10-30T16:56:50.791Z",
} as const satisfies Route
