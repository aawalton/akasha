import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicNext = {
  id: "01a062f8-fe5a-7000-a955-ec84925efd37",
  type: "page-type/command",
  slug: "music-next",
  definition: "the command choosing what Alan hears next out of the songs and artists he keeps",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An exhausted catalogue is reported rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The catalogue is read from the song pages and the artist pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A song reaches its artist whether or not it names that artist's page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The choice itself is made by `music-exploration`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A song page stating nothing performed is read as a song Alan holds no recording of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A grade is read under the `rank` key rather than under the `--rating` flag's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key a grade is read under is a key the page type declares or inherits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type declaring no `rank` is refused rather than read as nothing graded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page with no grade is ungraded rather than a fault.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches Spotify.",
    },
  ],
  name: "next",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
