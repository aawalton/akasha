import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spotifyCredentials = {
  id: "01a06261-dc1d-7001-9784-4341766fba01",
  type: "page-type/module",
  slug: "spotify-credentials",
  definition: "the three secrets behind a Spotify call",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each secret is read from the environment at the moment the secret is wanted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A secret the environment does not have throws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The token endpoint is authorised by the client id and secret together.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No secret is written to disk here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The header authorising the token endpoint asks for no redirect URI.",
    },
  ],
} as const satisfies Module
