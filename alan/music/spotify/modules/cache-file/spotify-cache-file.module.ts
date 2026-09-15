import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spotifyCacheFile = {
  id: "01a06261-dc1d-7002-81c0-cf6b422e7fb3",
  type: "page-type/module",
  slug: "spotify-cache-file",
  definition: "a small JSON file kept for Spotify in the user's cache folder",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The cache folder is `~/.cache/music-spotify`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An environment override names the whole path rather than the folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An override that is empty text is no override.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file lands readable and writable by its owner alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A missing file reads as nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that will not parse reads as nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file the shape refuses reads as nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Reading nothing where a file is unreadable is said on the error stream.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Removing a file that is already gone is done.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows the values a Spotify file has.",
    },
  ],
} as const satisfies Module
