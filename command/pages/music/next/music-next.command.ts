import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicNext = {
  id: "01a062f8-fe5a-7000-a955-ec84925efd37",
  type: "page-type/command",
  slug: "music-next",
  definition: "the command choosing what Alan hears next out of the tracks and artists he keeps",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An exhausted catalogue is reported rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The catalogue is read from the track pages, the song pages and the artist pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A song reaches its artist whether or not it names that artist's page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track reaches its artist through the song that track records.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track naming no song is left out of the catalogue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track stating no Spotify id on any release is left out of the catalogue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The choice itself is made by `music-exploration`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The id answered is the one Spotify gives on the first release by slug carrying it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The uri answered is `spotify:track:` and that id, which `play` takes whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The play query stays beside the uri, because a Spotify id dies where a release does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key a grade is read under is a key the page type declares or inherits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page type nothing is filed under is refused rather than read as nothing graded.",
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
