import type { Command } from "akasha/commands/command.page-type.types.ts"

export const musicRate = {
  id: "01a062fb-d2fb-72a1-8169-279a6baf3d97",
  type: "command",
  slug: "music-rate",
  definition: "the command recording Alan's grade and what he said onto a song or an artist",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "--target <artist|song>", takes: "which sort of page the grade is recorded onto" },
    { said: "--slug <slug>", takes: "the artist or song page the grade is recorded onto" },
    { said: "--rating <F..S+>", takes: "the grade, a rung on the ladder from `F` up to `S+`" },
    { said: "--reaction <md>", takes: "what Alan said about an artist, for `--target artist`" },
    { said: "--reaction-file <file>", takes: "a file the reaction is read from" },
    {
      said: "--personal-connections <md>",
      takes: "what a song is tied to in Alan's own life, for `--target song`",
    },
    {
      said: "--personal-connections-file <file>",
      takes: "a file the personal connections are read from",
    },
    { said: "--insights <md>", takes: "what Alan found in a song, for `--target song`" },
    { said: "--insights-file <file>", takes: "a file the insights are read from" },
    { said: "--json", takes: "give what was recorded as JSON rather than as a line" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A prose flag said beside its file twin is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A grade already recorded is written over.",
    },
    {
      invariantKind: "departure",
      statement: "A page is named by its slug.",
    },
    {
      invariantKind: "departure",
      statement: "A reaction is an artist's and insights and personal connections are a song's.",
    },
    {
      invariantKind: "departure",
      statement: "A grade is a rung on the ladder music grades pages by.",
    },
    {
      invariantKind: "departure",
      statement: "A call recording nothing is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Prose lands in a file beside the page.",
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
      invariantKind: "departure",
      statement: "A property the call does not name is left as that property was.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a music provider.",
    },
  ],
  name: "rate",
} as const satisfies Command
