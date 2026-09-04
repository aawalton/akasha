import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const spotifySearch = {
  id: "01a06261-dc1d-7009-8b51-0a4990d03db0",
  pageTypeSlug: "module",
  slug: "spotify-search",
  definition: "Spotify's catalog searched by text",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One search names each kind of thing the search asks for.",
    },
    {
      invariantKind: "departure",
      statement: "Each kind comes back under a section named for that kind in the plural.",
    },
    {
      invariantKind: "departure",
      statement: "A section the answer omits is no result rather than an empty one.",
    },
    {
      invariantKind: "departure",
      statement: "Spotify puts a null in among the items of some sections.",
    },
    {
      invariantKind: "departure",
      statement: "A null item is dropped while paging.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here ranks the results.",
    },
  ],
} as const satisfies Module
