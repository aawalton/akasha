import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const jennyCategorization = {
  id: "01a08260-8738-752f-9a25-c4cddf4cfd5e",
  pageTypeSlug: "route",
  type: "route",
  slug: "jenny-categorization",
  definition: "the count of unreviewed transactions Jenny's tile draws",
  code: "ts",
  test: "ts",
  urlPath: "api/categorization",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The readout served is the one thing named here.",
    },
    {
      invariantKind: "departure",
      statement: "Everything else about that readout is read off the readout's own page.",
    },
  ],
} as const satisfies Route
