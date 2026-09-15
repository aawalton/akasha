import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicCapture = {
  id: "01a063b0-cb34-7001-99b2-fd47783030fb",
  type: "command",
  slug: "music-capture",
  definition: "the command filing what Alan played on Spotify onto the days he played it in",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  parts: ["module/play-row"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The plays taken are the fifty Spotify gives back for one page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run finding no play filed anywhere is a priming run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A listen lands beside its day page and a heard track beside the heard music page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Capture adds to the rows filed and rewrites no row already filed.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "The plays are worked oldest first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A play Spotify names no track id for is passed over and counted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A track is heard again where either its id or its title key is already filed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A track already heard keeps the instant that track was first heard.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The listens and the heard tracks land as a single commit or not at all.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run recording nothing lands nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day with no page of its own is refused rather than given one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is written through the change working out what kind of path it is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The landing a page goes through is handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A landing that wrote before it went wrong is answered with what that run wrote.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run saying to write nothing reaches no landing and names what would be written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every listen and every heard track is composed carrying an id of its own.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No test here reaches Spotify.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An append hands in the body it read, so a body that moved refuses the write.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day page written again hands in the body its values were composed from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that wrote before it threw says in its refusal what that run had written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fault carries the code that fault names and says where it was thrown.",
    },
  ],
  name: "capture",
  arguments: [{ argument: "argument/json" }, { argument: "argument/dry-run" }],
} as const satisfies Command
