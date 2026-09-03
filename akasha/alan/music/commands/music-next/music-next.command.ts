import type { Command } from "@akasha/command-system/command"

export const musicNext = {
  id: "01a062f8-fe5a-7000-a955-ec84925efd37",
  pageTypeSlug: "command",
  slug: "music-next",
  definition: "the command choosing what Alan hears next out of the songs and artists he keeps",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [{ said: "--json", takes: "give the selection as JSON rather than as human text" }],
  helpNotes: [
    "the songs and the artists are read from the pages akasha carries rather than from Spotify.",
    "a loved artist with a song left ungraded is offered before an artist no grade rests on.",
    "an exhausted catalogue is reported rather than refused.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The catalogue is read from the song pages and the artist pages.",
    },
    {
      invariantKind: "departure",
      statement: "The choice itself is made by `music-exploration`.",
    },
    {
      invariantKind: "departure",
      statement: "A song page naming no type is read as a song the artist did not write.",
    },
    {
      invariantKind: "departure",
      statement:
        "A grade is read under the `rank` key rather than under the `--rating` flag's name.",
    },
    {
      invariantKind: "departure",
      statement: "The key a grade is read under is one the page type declares or inherits.",
    },
    {
      invariantKind: "departure",
      statement: "A page type declaring no `rank` is refused rather than read as nothing graded.",
    },
    {
      invariantKind: "departure",
      statement: "A page carrying no grade is ungraded rather than a fault.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches Spotify.",
    },
  ],
} as const satisfies Command
