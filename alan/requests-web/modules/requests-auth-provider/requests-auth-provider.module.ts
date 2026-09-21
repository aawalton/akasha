import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const requestsAuthProvider = {
  id: "01a0c537-bbe7-7ea3-aabc-220dc3ae73ca",
  type: "page-type/module",
  slug: "requests-auth-provider",
  definition: "what tells the Requests site's page store who is reading, signed in or not",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page store comes up for a reader who is not signed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What an unsigned reader is served is settled by the gate the server holds.",
    },
  ],
} as const satisfies Module
