import type { Command } from "@akasha/command-system/command"

export const musicSearch = {
  id: "01a062f8-ead9-70cb-ae30-58a51b7fc488",
  pageTypeSlug: "command",
  slug: "music-search",
  definition: "the command naming the Spotify tracks a query matches, each with its artists",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "query", takes: "the track query the search is made with" },
    { said: "--artist <name>", takes: "keep only candidates whose artist contains this name" },
    { said: "--limit <n>", takes: "the most candidates given back, five where nothing is said" },
    { said: "--top <n>", takes: "another spelling of --limit" },
    { said: "--json", takes: "give one JSON envelope rather than human lines" },
  ],
  helpNotes: [
    "an artist name is matched without regard to case against any part of a candidate's artist.",
    "an artist named widens the fetch to ten candidates before the filtering, and ten is the most fetched.",
    "each candidate is given with its track name, its artists, its album and its Spotify uri.",
  ],
  invariants: [
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
      invariantKind: "absence",
      statement: "Nothing here starts playback.",
    },
  ],
} as const satisfies Command
