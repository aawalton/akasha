import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiAuth = {
  id: "01a0bafb-9c26-7fbf-a604-d1157ce78af0",
  type: "page-type/route",
  slug: "alan-web-api-auth",
  definition: "every address Better Auth answers for alanwalton.com",
  code: "ts",
  urlPath: "api/auth/*",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One route answers every address under the base path Better Auth is given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read and a write are both handed to the same handler.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Google is handed back `/api/auth/callback/google`, which is this base path and nothing added.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "This route beats the catch-all that answers an address under `/api/`.",
    },
  ],
} as const satisfies Route
