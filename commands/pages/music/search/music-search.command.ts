import type { Command } from "akasha/commands/command.page-type.types.ts"

export const musicSearch = {
  id: "01a062f8-ead9-70cb-ae30-58a51b7fc488",
  type: "command",
  slug: "music-search",
  definition: "the command naming the Spotify tracks a query matches, each with its artists",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An artist named widens the fetch to the most candidates before the filtering.",
    },
    {
      invariantKind: "departure",
      statement: "A candidate is given with its track name, its artists, its album and its uri.",
    },
    {
      invariantKind: "departure",
      statement: "An artist named is matched without regard to case.",
    },
    {
      invariantKind: "departure",
      statement: "An artist named is matched against any part of a candidate's artist.",
    },
    {
      invariantKind: "departure",
      statement: "Ten is the most candidates fetched.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no query is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A call saying no limit gives back five candidates.",
    },
    {
      invariantKind: "absence",
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
