import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const spotifyPersonalization = {
  id: "01a06261-dc1d-700b-8dad-bfbcd632cbad",
  pageTypeSlug: "module",
  slug: "spotify-personalization",
  definition: "the artists and tracks Alan has heard most over a window",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A window is the last four weeks or the last six months or the account's whole life.",
    },
    {
      invariantKind: "departure",
      statement: "Fifty is the most Spotify gives back for one window.",
    },
    {
      invariantKind: "departure",
      statement: "A read takes one page rather than every page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here compares two windows.",
    },
  ],
} as const satisfies Module
