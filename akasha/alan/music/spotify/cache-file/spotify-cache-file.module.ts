import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const spotifyCacheFile = {
  id: "01a06261-dc1d-7002-81c0-cf6b422e7fb3",
  pageTypeSlug: "module",
  slug: "spotify-cache-file",
  definition: "a small JSON file kept for Spotify in the user's cache folder",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The cache folder is `~/.cache/collections-music-spotify`.",
    },
    {
      invariantKind: "departure",
      statement: "An environment override names the whole path rather than the folder.",
    },
    {
      invariantKind: "departure",
      statement: "An override that is empty text is no override.",
    },
    {
      invariantKind: "departure",
      statement: "A file lands readable and writable by its owner alone.",
    },
    {
      invariantKind: "departure",
      statement: "A missing file reads as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A file that will not parse reads as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A file the shape refuses reads as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Reading nothing where a file is unreadable is said on the error stream.",
    },
    {
      invariantKind: "departure",
      statement: "Removing a file that is already gone is done.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what a Spotify file holds.",
    },
  ],
} as const satisfies Module
