import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const navReach = {
  id: "01a16fdf-ea8f-714a-af00-6990b8af7c41",
  type: "page-type/module",
  slug: "nav-reach",
  definition: "the nav items of Alan's site a reader's access reaches",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A nav item drawing views is reached by a reader who reads the app's nav pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A nav item leading to a route is reached by route access naming the item's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Route access naming every route reaches every nav item leading to a route.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A nav item no access reaches is drawn nowhere for that reader.",
    },
  ],
  createdAt: "2026-10-24T21:45:07.983Z",
  updatedAt: "2026-10-24T21:45:07.983Z",
} as const satisfies Module
