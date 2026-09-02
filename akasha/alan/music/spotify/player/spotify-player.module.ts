import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const spotifyPlayer = {
  id: "01a06261-dc1d-7008-b575-b9785f2015e8",
  pageTypeSlug: "module",
  slug: "spotify-player",
  definition: "what is playing on Alan's devices and what is asked of them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A read of the player answers null where nothing is playing.",
    },
    {
      invariantKind: "departure",
      statement: "A command to the player answers an empty body.",
    },
    {
      invariantKind: "departure",
      statement: "A device named nowhere is the one Spotify calls active.",
    },
    {
      invariantKind: "departure",
      statement: "Recently played is a cursor page rather than an offset page.",
    },
    {
      invariantKind: "departure",
      statement: "A field Spotify adds later is carried through unread.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides which track to play.",
    },
  ],
} as const satisfies Module
