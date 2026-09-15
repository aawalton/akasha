import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spotifySearch = {
  id: "01a06261-dc1d-7009-8b51-0a4990d03db0",
  type: "page-type/module",
  slug: "spotify-search",
  definition: "Spotify's catalog searched by text",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One search names each kind of thing the search asks for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each kind comes back under a section named for that kind in the plural.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A section the answer omits is no result rather than an empty result.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Spotify puts a null in among the items of some sections.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here ranks the results.",
    },
  ],
} as const satisfies Module
