import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const spotifyScopes = {
  id: "01a06261-dc1d-7005-9e93-d5c9f5bf2239",
  type: "module",
  slug: "spotify-scopes",
  definition: "what Alan consents to when he authorises this client",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Consent is asked for once and covers every scope at once.",
    },
    {
      invariantKind: "departure",
      statement: "Spotify is given the scopes as one space-parted line.",
    },
    {
      invariantKind: "departure",
      statement: "A scope the consent no longer covers is dropped by asking again.",
    },
    {
      invariantKind: "departure",
      statement: "A scope no call in this domain needs is not asked for.",
    },
  ],
} as const satisfies Module
