import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicSearch = {
  id: "01a062f8-ead9-70cb-ae30-58a51b7fc488",
  type: "command",
  slug: "music-search",
  definition: "the command naming the Spotify tracks a query matches, each with its artists",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An artist named widens the fetch to the most candidates before the filtering.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A candidate is given with its track name, its artists, its album and its uri.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An artist named is matched without regard to case.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An artist named is matched against any part of a candidate's artist.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Ten is the most candidates fetched.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no query is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call saying no limit gives back five candidates.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here starts playback.",
    },
  ],
  name: "search",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/limit", default: "5" },
    { argument: "argument/artist" },
    { argument: "argument/query", required: true, saidAs: "word" },
  ],
} as const satisfies Command
