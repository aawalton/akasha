import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiPushRegister = {
  id: "01a08834-9fa8-7538-bb21-73af9a36b58d",
  type: "page-type/route",
  slug: "alan-web-api-push-register",
  definition: "the push token of a reader's app",
  code: "ts",
  urlPath: "api/push/register",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The app a token is kept under is Alan's, whatever the body says.",
    },
  ],
  createdAt: "2026-09-09T22:05:45.256Z",
  updatedAt: "2026-10-18T13:24:10.292Z",
} as const satisfies Route
