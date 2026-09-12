import type { Command } from "akasha/commands/command.page-type.types.ts"

export const musicImportArtist = {
  id: "01a062fb-d2fd-72f5-b24e-22a9635b5910",
  type: "command",
  slug: "music-import-artist",
  definition: "the command bringing an artist and every song of theirs in from MusicBrainz",
  code: "ts",
  test: "ts",
  taking: [
    { said: "<name>", takes: "the artist to look for, said as `--name` is said" },
    { said: "--name <name>", takes: "the artist to look for by name" },
    { said: "--mbid <mbid>", takes: "the artist's MusicBrainz id, which is looked for by nothing" },
    { said: "--limit <n>", takes: "how many songs at most are brought in" },
    { said: "--json", takes: "give what was brought in as JSON rather than as rows" },
  ],

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
  ],
  name: "import-artist",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
