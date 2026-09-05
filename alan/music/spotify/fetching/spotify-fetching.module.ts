import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const spotifyFetching = {
  id: "01a06261-dc1d-700f-a5c9-3bfc9c2b5371",
  pageTypeSlug: "module",
  slug: "spotify-fetching",
  definition: "the one function every call to Spotify is made through",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A test that reaches the live Spotify API risks the ban an unpaced sweep earns.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call over HTTP is what this module answers to until something replaces the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A replacement holds until the call over HTTP is put back.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what a Spotify URL means.",
    },
  ],
} as const satisfies Module
