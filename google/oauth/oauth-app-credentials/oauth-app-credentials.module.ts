import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const oauthAppCredentials = {
  id: "01a05bdc-e25c-7dd0-ad2f-2a9019b21439",
  pageTypeSlug: "module",
  slug: "oauth-app-credentials",
  definition: "the client id and secret the Google desktop app is reached with",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "No refresh token is read here.",
    },
    {
      invariantKind: "departure",
      statement: "The pair is read from the environment at the moment the pair is asked for.",
    },
  ],
} as const satisfies Module
