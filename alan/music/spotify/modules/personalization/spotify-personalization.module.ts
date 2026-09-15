import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spotifyPersonalization = {
  id: "01a06261-dc1d-700b-8dad-bfbcd632cbad",
  type: "page-type/module",
  slug: "spotify-personalization",
  definition: "the artists and tracks Alan has heard most over a window",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A window is the last four weeks or the last six months or the account's whole life.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Fifty is the most Spotify gives back for one window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read takes one page rather than every page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here compares two windows.",
    },
  ],
} as const satisfies Module
