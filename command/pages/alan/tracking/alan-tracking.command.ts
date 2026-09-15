import type { Command } from "akasha/command/command.page-type.types.ts"

export const alanTracking = {
  id: "01a06057-f714-707b-acab-a560208ffcd3",
  type: "page-type/command",
  slug: "alan-tracking",
  definition:
    "the command landing the pages and row files of Alan's tracking that a program composed",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "No call names the kind of change landed here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tracked trees are Alan's days and his food entries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path outside the tracked trees is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The change a call asks for is read by `file-arguing` and landed by `track-landing`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This command reads the arguments.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The function this command calls knows no command line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The kind named here runs no warrant.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No reading is owed for a path landed here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The kind landed here is mechanical.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No check judges the change landed here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every flag `file-arguing` takes is taken here but the glass and `--restated`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "One call names one `--file-path` and one `--content-file`, and several files take several calls.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here breaks the glass.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here lands a restatement.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Nothing here reaches a path an agent chose.",
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
  name: "tracking",
  arguments: [
    { argument: "argument/commit-message", notWith: ["argument/message-file"] },
    { argument: "argument/message-file" },
    { argument: "argument/content-file" },
    { argument: "argument/file-path", oneOf: ["argument/remove-path"] },
    { argument: "argument/remove-path", repeats: true },
  ],
} as const satisfies Command
