import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const inboxStoplights = {
  id: "01a072b2-59cc-72dc-9f34-01e609e3f191",
  pageTypeSlug: "route",
  type: "route",
  slug: "inbox-stoplights",
  definition: "Alan's inboxes as the colors their counts reach",
  code: "ts",
  test: "ts",
  urlPath: "api/inbox-stoplights",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The key each reading travels under is `inbox` rather than `habit`.",
    },
    {
      invariantKind: "departure",
      statement: "The tile shipped against this reads that key as text that is always there.",
    },
    {
      invariantKind: "departure",
      statement: "Every readout the inboxes group admits answers a ring of its own.",
    },
    {
      invariantKind: "departure",
      statement: "Both inbox scales fall rather than climb.",
    },
  ],
} as const satisfies Route
