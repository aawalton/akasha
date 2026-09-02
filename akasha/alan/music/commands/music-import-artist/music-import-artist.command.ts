import type { Command } from "@akasha/command-system/command"

export const musicImportArtist = {
  id: "01a062fb-d2fd-72f5-b24e-22a9635b5910",
  pageTypeSlug: "command",
  slug: "music-import-artist",
  definition: "the command bringing an artist and every song of theirs in from MusicBrainz",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-checked",
  taking: [
    { said: "<name>", takes: "the artist to look for, said as `--name` is said" },
    { said: "--name <name>", takes: "the artist to look for by name" },
    { said: "--mbid <mbid>", takes: "the artist's MusicBrainz id, which is looked for by nothing" },
    { said: "--limit <n>", takes: "how many songs at most are brought in" },
    { said: "--json", takes: "give what was brought in as JSON rather than as rows" },
  ],
  helpNotes: [
    "an artist is named by `--name` or by `--mbid`, and a name that matches exactly wins over one scored higher.",
    "the songs are the artist's works, and an artist MusicBrainz files no work under is read from their recordings.",
    "the words of each song are asked of LRCLIB and land in a file beside the song.",
    "a song already here keeps the name it has, matched by the MusicBrainz id it was filed under.",
    "a field this does not fetch is left as it was, so a rating already recorded is kept.",
    "the artist and every song land as one commit or none of them do.",
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
      statement: "A field this does not fetch is left as it was.",
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
      statement: "The artist and the songs land as one commit or as none.",
    },
    {
      invariantKind: "absence",
      statement: "No test here reaches MusicBrainz or LRCLIB.",
    },
  ],
} as const satisfies Command
