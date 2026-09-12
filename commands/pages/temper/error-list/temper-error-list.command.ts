import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperErrorList = {
  id: "01a0603c-c1cd-7e91-9eb8-0b6cf8d8b9e5",
  type: "command",
  slug: "temper-error-list",
  definition: "the command naming the game's Lua errors the errors addon captured",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A call naming no path reads the errors addon's capture in the game's live saved variables.",
    },
    {
      invariantKind: "departure",
      statement:
        "An entry is stale where that entry's gap behind the log frontier is longer than the window.",
    },
    {
      invariantKind: "departure",
      statement: "A stale entry is left out unless the call asks for stale entries.",
    },
    {
      invariantKind: "departure",
      statement: "A stale entry shown has its liveness.",
    },
    {
      invariantKind: "departure",
      statement: "How many stale entries were left out is said rather than left to be counted.",
    },
    {
      invariantKind: "departure",
      statement: "A capture with no entry is refused rather than reported as a clean run.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the game.",
    },
  ],
  name: "error-list",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/errors-path" },
    { argument: "argument/include-stale" },
    { argument: "argument/stale-after-hours" },
  ],
} as const satisfies Command
