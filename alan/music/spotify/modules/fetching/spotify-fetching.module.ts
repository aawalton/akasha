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
      statement: "The call a request is made over is passed in by the caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller passing no call is answered over HTTP.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a Spotify URL.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here is kept between one call and the next.",
    },
  ],
} as const satisfies Module
