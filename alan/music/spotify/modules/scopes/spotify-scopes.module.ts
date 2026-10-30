import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spotifyScopes = {
  id: "01a06261-dc1d-7005-9e93-d5c9f5bf2239",
  type: "page-type/module",
  slug: "spotify-scopes",
  definition: "the consent Alan gives the music commands",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Consent is asked for once and covers every scope at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Spotify is given the scopes as one space-parted line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scope the consent no longer covers is dropped by asking again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scope no call in this domain needs is not asked for.",
    },
  ],
  createdAt: "2026-09-02T13:49:35.645Z",
  updatedAt: "2026-10-30T16:24:50.844Z",
} as const satisfies Module
