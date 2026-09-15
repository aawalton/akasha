import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spotifyFetching = {
  id: "01a06261-dc1d-700f-a5c9-3bfc9c2b5371",
  type: "page-type/module",
  slug: "spotify-fetching",
  definition: "the network call every Spotify request is made over",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A test that reaches the live Spotify API risks the ban an unpaced sweep earns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call over HTTP is this module's answer until something replaces the answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A replacement holds until the call over HTTP is put back.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a Spotify URL.",
    },
  ],
} as const satisfies Module
