import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiErrors = {
  id: "01a0882e-29b1-7d23-b973-769880c8ff12",
  type: "page-type/route",
  slug: "alan-web-api-errors",
  definition: "the errors a browser sends to alanwalton.com",
  code: "ts",
  urlPath: "api/errors",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A report sent from the capacitor shell is answered with cross-origin headers.",
    },
  ],
  createdAt: "2026-09-09T21:58:41.841Z",
  updatedAt: "2026-10-30T16:52:28.162Z",
} as const satisfies Route
