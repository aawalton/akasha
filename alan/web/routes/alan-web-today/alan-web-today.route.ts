import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebToday = {
  id: "01a198a2-d3d4-7e45-905c-1e6cdf7c7269",
  type: "page-type/route",
  slug: "alan-web-today",
  definition: "the sessions of Alan's day so far, with what each cost or gave back",
  code: "tsx",
  urlPath: "today",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Today is the day page of the Mountain calendar day the page is drawn on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session still running is counted to the moment the page is drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session's capacity is worked out as the capacity readout works it out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader Google has not signed in is sent to the sign-in route.",
    },
  ],
  createdAt: "2026-11-01T19:42:50.322Z",
  updatedAt: "2026-11-01T19:42:50.322Z",
} as const satisfies Route
