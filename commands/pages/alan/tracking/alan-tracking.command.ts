import type { Command } from "akasha/commands/command.page-type.types.ts"

export const alanTracking = {
  id: "01a06057-f714-707b-acab-a560208ffcd3",
  type: "command",
  slug: "alan-tracking",
  definition:
    "the command landing the pages and row files of Alan's tracking that a program composed",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  taking: [
    { said: "--content-file <file>", takes: "the body that lands at the --file-path before it" },
    { said: "--message-file <file>", takes: "a file the commit message is read from" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "No call names the kind of change landed here.",
    },
    {
      invariantKind: "departure",
      statement: "The tracked trees are Alan's days and his food entries.",
    },
    {
      invariantKind: "departure",
      statement: "A path outside the tracked trees is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "The change a call asks for is read by `file-arguing` and landed by `tracking-landing`.",
    },
    {
      invariantKind: "departure",
      statement: "This command reads the arguments.",
    },
    {
      invariantKind: "departure",
      statement: "The function this command calls knows no command line.",
    },
    {
      invariantKind: "departure",
      statement: "The kind named here runs no warrant.",
    },
    {
      invariantKind: "departure",
      statement: "No reading is owed for a path landed here.",
    },
    {
      invariantKind: "departure",
      statement: "Every check that judges a write judges the change landed here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here breaks the glass.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a path an agent chose.",
    },
  ],
  name: "tracking",
  arguments: [
    { argument: "argument/file-path" },
    { argument: "argument/remove-path" },
    { argument: "argument/commit-message" },
  ],
} as const satisfies Command
