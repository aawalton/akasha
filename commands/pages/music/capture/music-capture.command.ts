import type { Command } from "akasha/commands/command.page-type.types.ts"

export const musicCapture = {
  id: "01a063b0-cb34-7001-99b2-fd47783030fb",
  type: "command",
  slug: "music-capture",
  definition: "the command filing what Alan played on Spotify onto the days he played it in",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  parts: ["module/play-row"],
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The plays taken are the fifty Spotify gives back for one page.",
    },
    {
      invariantKind: "departure",
      statement: "A run finding no play filed anywhere is a priming run.",
    },
    {
      invariantKind: "departure",
      statement:
        "A listen lands beside its day page and a heard track beside the heard music page.",
    },
    {
      invariantKind: "departure",
      statement: "Capture adds to the rows filed and rewrites no row already filed.",
    },

    {
      invariantKind: "departure",
      statement: "The plays are worked oldest first.",
    },
    {
      invariantKind: "departure",
      statement: "A play Spotify names no track id for is passed over and counted.",
    },
    {
      invariantKind: "departure",
      statement: "A track is heard again where either its id or its title key is already filed.",
    },
    {
      invariantKind: "departure",
      statement: "A track already heard keeps the instant that track was first heard.",
    },
    {
      invariantKind: "departure",
      statement: "The listens and the heard tracks land as a single commit or not at all.",
    },
    {
      invariantKind: "departure",
      statement: "A run recording nothing lands nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A day with no page of its own is refused rather than given one.",
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
      statement: "A landing that wrote before it went wrong is answered with what that run wrote.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run saying to write nothing reaches no landing and names what would be written.",
    },
    {
      invariantKind: "departure",
      statement: "Every listen and every heard track is composed carrying an id of its own.",
    },
    {
      invariantKind: "absence",
      statement: "No test here reaches Spotify.",
    },
  ],
  name: "capture",
  arguments: [{ argument: "argument/json" }, { argument: "argument/dry-run" }],
} as const satisfies Command
