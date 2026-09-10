import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const alanWebApiErrors = {
  id: "01a0882e-29b1-7d23-b973-769880c8ff12",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-api-errors",
  definition: "the errors a reader's browser reports",
  code: "ts",
  urlPath: "api/errors",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A report sent from the capacitor shell is answered with cross-origin headers.",
    },
  ],
} as const satisfies Route
