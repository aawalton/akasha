import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spotifyFetching = {
  id: "01a06261-dc1d-700f-a5c9-3bfc9c2b5371",
  type: "page-type/module",
  slug: "spotify-fetching",
  definition: "the network call carrying every Spotify request",
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
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A call that throws is made three times in all, waiting a second and then four seconds between.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The error the third throw raises is thrown on unchanged, so the run still fails.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The wait between one try and the next is passed in by the caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller passing no wait waits on a timer.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No answer that arrives is tried again here, whatever status that answer carries.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A 429 and a 401 are tried again by `module/spotify-client`, so no try here multiplies one there.",
    },
  ],
} as const satisfies Module
