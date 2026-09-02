import type { Module } from "@akasha/code-system/module"

export const mediaProvider = {
  id: "01a06069-f8c6-70d6-95b7-416a6fcedd26",
  pageTypeSlug: "module",
  slug: "media-provider",
  definition: "the calls another addon makes to add and fetch media",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A media kind is lower-cased before the media kind is keyed on.",
    },
    {
      invariantKind: "departure",
      statement: "A key already taken is refused rather than replaced.",
    },
    {
      invariantKind: "departure",
      statement: "A fetch missing its key falls back to the default for that media kind.",
    },
    {
      invariantKind: "departure",
      statement: "A blacklisted font on a console answers the medium font.",
    },
    {
      invariantKind: "departure",
      statement: "The sorted key list for a media kind is rebuilt whenever a key is added.",
    },
    {
      invariantKind: "departure",
      statement: "Adding media fires a callback naming the media kind and the key.",
    },
  ],
} as const satisfies Module
