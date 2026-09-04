import type { Command } from "@akasha/command-system/command"

export const musicRate = {
  id: "01a062fb-d2fb-72a1-8169-279a6baf3d97",
  pageTypeSlug: "command",
  slug: "music-rate",
  definition: "the command recording Alan's grade and what he said onto a song or an artist",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
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
  helpNotes: [
    "a page is named by its slug, which is what `music-next` gives back.",
    "`--reaction` belongs to an artist, and `--personal-connections` and `--insights` belong to a song.",
    "a call recording nothing is refused, so name a rating or one of the prose flags.",
    "each prose flag has a `-file` twin reading the same value off a file, and one call says one of the two.",
    "the prose lands in a file beside the page rather than in the page.",
    "a rating already there is written over.",
  ],
  invariants: [
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
      statement: "A property the call does not name is left as it was.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a music provider.",
    },
  ],
} as const satisfies Command
