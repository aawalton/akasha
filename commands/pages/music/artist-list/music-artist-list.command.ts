import type { Command } from "akasha/commands/command.page-type.types.ts"

export const musicArtistList = {
  id: "01a09b87-8def-7c15-a542-ef8c973a057d",
  type: "command",
  slug: "music-artist-list",
  definition:
    "the command listing the artists Alan keeps, what he graded each and how far he is in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "How far through an artist Alan is, is added up from the releases naming that artist.",
    },
    {
      invariantKind: "departure",
      statement: "An artist naming no release is listed, and adds to no total.",
    },
    {
      invariantKind: "departure",
      statement: "The totals are over the artists listed rather than over every artist.",
    },
    {
      invariantKind: "departure",
      statement: "A status no collection states is refused before any page is read.",
    },
    {
      invariantKind: "departure",
      statement: "Every artist is listed where no status is asked for.",
    },
    {
      invariantKind: "departure",
      statement: "The rungs counted are the rungs the artists listed reach.",
    },
    {
      invariantKind: "departure",
      statement: "Artists are listed by how long each one runs, longest first.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a music provider.",
    },
  ],
  name: "artist-list",
  arguments: [{ argument: "argument/json" }, { argument: "argument/collection-status" }],
} as const satisfies Command
