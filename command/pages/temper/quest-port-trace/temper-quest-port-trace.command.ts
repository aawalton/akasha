import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperQuestPortTrace = {
  id: "01a11c7f-285d-7a2e-b753-227f6826b2c1",
  type: "page-type/command",
  slug: "temper-quest-port-trace",
  definition:
    "the command reading the open journals, port presses and next-quest moves the world add-on captured",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The captures are read from the world add-on's saved variables.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A call naming no path reads the world add-on's capture in the game's live saved variables.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer says when the game last wrote the file it read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file with no journal, no press and no move refuses the call.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the game.",
    },
  ],
  name: "quest-port-trace",
  arguments: [{ argument: "argument/json" }, { argument: "argument/quest-trace-path" }],
  createdAt: "2026-10-08T17:10:57.884Z",
  updatedAt: "2026-10-08T17:10:57.884Z",
} as const satisfies Command
