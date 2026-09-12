import type { Command } from "akasha/commands/command.page-type.types.ts"

export const musicImportArtist = {
  id: "01a062fb-d2fd-72f5-b24e-22a9635b5910",
  type: "command",
  slug: "music-import-artist",
  definition: "the command bringing an artist and every song of theirs in from MusicBrainz",
  code: "ts",
  test: "ts",

  invariants: [
    {
      invariantKind: "constraint",
      statement: "MusicBrainz and LRCLIB are asked at the pace their clients keep.",
    },
    {
      invariantKind: "departure",
      statement: "An artist is named by a name or by a MusicBrainz id.",
    },
    {
      invariantKind: "departure",
      statement: "An artist MusicBrainz files no work under is read from their recordings.",
    },
    {
      invariantKind: "departure",
      statement: "A song already brought in keeps the slug that song was filed under.",
    },
    {
      invariantKind: "departure",
      statement: "A field this command does not fetch is left as that field was.",
    },
    {
      invariantKind: "departure",
      statement: "The words of a song land in a file beside the song.",
    },
    {
      invariantKind: "departure",
      statement: "A song LRCLIB answers nothing for is brought in without words.",
    },
    {
      invariantKind: "departure",
      statement: "The artist and the songs land as a single commit or do not land.",
    },
    {
      invariantKind: "departure",
      statement: "A page is written through the change working out what kind of path it is.",
    },
    {
      invariantKind: "departure",
      statement: "The landing a page goes through is handed in.",
    },
    {
      invariantKind: "absence",
      statement: "No test here reaches MusicBrainz or LRCLIB.",
    },
    {
      invariantKind: "departure",
      statement: "A run that wrote before it threw says in its refusal what that run had written.",
    },
    {
      invariantKind: "departure",
      statement: "A fault carries the code that fault names and says where it was thrown.",
    },
  ],
  name: "import-artist",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/song-limit" },
    { argument: "argument/artist-name", saidAs: "flag-or-word" },
    { argument: "argument/mbid" },
  ],
} as const satisfies Command
