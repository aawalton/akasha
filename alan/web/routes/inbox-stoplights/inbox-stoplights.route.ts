import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const inboxStoplights = {
  id: "01a072b2-59cc-72dc-9f34-01e609e3f191",
  type: "page-type/route",
  slug: "inbox-stoplights",
  definition: "the stoplights a readout widget shows for Alan's inboxes",
  code: "ts",
  test: "ts",
  urlPath: "api/inbox-stoplights",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The key each reading travels under is the one the group's page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tile shipped against this reads that key as text that is always there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every readout the inboxes group admits answers a ring of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every inbox scale falls rather than climbs.",
    },
  ],
  createdAt: "2026-09-05T17:51:26.156Z",
  updatedAt: "2026-10-30T17:01:30.215Z",
} as const satisfies Route
