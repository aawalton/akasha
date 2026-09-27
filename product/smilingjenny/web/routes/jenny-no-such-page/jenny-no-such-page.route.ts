import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const jennyNoSuchPage = {
  id: "01a0e316-e586-738d-b64c-a9a891b048f5",
  type: "page-type/route",
  slug: "jenny-no-such-page",
  definition: "that no page of Jenny's site is at the address a reader named",
  code: "ts",
  urlPath: "*",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every address no other route answers is answered not found here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The root's loader runs beside this one, so the error screen reads the home document.",
    },
  ],
} as const satisfies Route
