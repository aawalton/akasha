import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const oauthAppCredentials = {
  id: "01a05bdc-e25c-7dd0-ad2f-2a9019b21439",
  type: "page-type/module",
  slug: "oauth-app-credentials",
  definition: "the client id and secret the Google desktop app is reached with",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "No refresh token is read here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pair is read from the environment at the moment the pair is asked for.",
    },
  ],
} as const satisfies Module
