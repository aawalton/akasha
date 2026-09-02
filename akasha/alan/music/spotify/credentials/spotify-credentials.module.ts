import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const spotifyCredentials = {
  id: "01a06261-dc1d-7001-9784-4341766fba01",
  pageTypeSlug: "module",
  slug: "spotify-credentials",
  definition: "the three secrets a Spotify call is made under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each secret is read from the environment at the moment the secret is wanted.",
    },
    {
      invariantKind: "departure",
      statement: "A secret the environment does not carry throws.",
    },
    {
      invariantKind: "departure",
      statement: "The token endpoint is authorised by the client id and secret together.",
    },
    {
      invariantKind: "absence",
      statement: "No secret is written to disk here.",
    },
  ],
} as const satisfies Module
