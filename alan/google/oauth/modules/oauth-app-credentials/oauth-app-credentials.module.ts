import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const oauthAppCredentials = {
  id: "01a05bdc-e25c-7dd0-ad2f-2a9019b21439",
  type: "page-type/module",
  slug: "oauth-app-credentials",
  definition: "the Google desktop app's client id and secret",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No refresh token is read here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pair is read from the environment at the moment the pair is asked for.",
    },
  ],
} as const satisfies Module
