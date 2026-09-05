import type { Command } from "../../command-system/commands/command.page-type.ts"

export const test = {
  id: "01a04ea6-15a3-7000-830d-4cdb1779e81f",
  pageTypeSlug: "command",
  slug: "test",
  definition: "the command running the akasha tests and saying whether they passed",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--file-path <path>", takes: "a file or folder in the repository whose tests run" },
    { said: "--named <text>", takes: "the whole name of the one test that runs" },
  ],
  helpNotes: [
    "--file-path repeats, so several paths run in one call.",
    "named nothing, it runs every test in the repository.",
    "--named matches a whole test name rather than a pattern or a part of one.",
    "--named naming no test runs nothing rather than refusing.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run reaches no test outside this repository.",
    },
    {
      invariantKind: "departure",
      statement: "A run named nothing runs every test in this repository.",
    },
    {
      invariantKind: "departure",
      statement:
        "The verdict is read from what the run printed rather than from its exit code alone.",
    },
    {
      invariantKind: "departure",
      statement: "A run reaching fewer files than are under it has failed rather than passed.",
    },
    {
      invariantKind: "departure",
      statement: "A run printing no summary carries the tail of what the runner printed.",
    },
    {
      invariantKind: "departure",
      statement: "A run the runner died on names the signal that killed the runner.",
    },
    {
      invariantKind: "departure",
      statement:
        "That tail is bounded in lines and in bytes alike, and a whole line goes rather than part of one.",
    },
    {
      invariantKind: "departure",
      statement: "A run printing no summary names no test, no test having run to be named.",
    },
    {
      invariantKind: "departure",
      statement: "A run naming a test runs the one test whose whole name that is.",
    },
    {
      invariantKind: "departure",
      statement: "A name is matched whole rather than as a pattern or as a part of a name.",
    },
    {
      invariantKind: "departure",
      statement: "A run naming a test no test is called runs nothing rather than refusing.",
    },
    {
      invariantKind: "departure",
      statement: "A run naming a test is not weighed against the test files under what was named.",
    },
  ],
} as const satisfies Command
