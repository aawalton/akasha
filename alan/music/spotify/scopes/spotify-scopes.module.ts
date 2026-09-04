import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const spotifyScopes = {
  id: "01a06261-dc1d-7005-9e93-d5c9f5bf2239",
  pageTypeSlug: "module",
  slug: "spotify-scopes",
  definition: "what Alan consents to when he authorises this client",
  code: "ts",
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
  ],
} as const satisfies Module
