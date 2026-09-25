import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const jennyCategorization = {
  id: "01a08260-8738-752f-9a25-c4cddf4cfd5e",
  type: "page-type/route",
  slug: "jenny-categorization",
  definition: "the count of unreviewed transactions Jenny's tile draws",
  code: "ts",
  test: "ts",
  urlPath: "api/categorization",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The readout served is the one whose page names this route.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Everything else about that readout is read off the readout's own page.",
    },
  ],
} as const satisfies Route
