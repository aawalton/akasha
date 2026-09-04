import type { Module } from "@akasha/code-system/module"

export const turnEndReadCommand = {
  id: "01a06a04-6de8-7000-9ee4-55f07980cf2c",
  pageTypeSlug: "module",
  slug: "turn-end-read-command",
  definition: "one turn end read on demand, answered as an exit code",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The ops dispatcher spawns the turn-end read as a program of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The path spawned is the one the ops-command page names.",
    },
    {
      invariantKind: "departure",
      statement: "A default export would make the dispatcher import the code instead.",
    },
    {
      invariantKind: "departure",
      statement: "An imported command returns no exit code to the caller.",
    },
    {
      invariantKind: "departure",
      statement: "Exit code 0 lets the turn end.",
    },
    {
      invariantKind: "departure",
      statement: "Exit code 3 refuses the turn end.",
    },
    {
      invariantKind: "departure",
      statement: "Any other exit code is a failure rather than an answer.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing invokes the turn-end read when a turn ends.",
    },
    {
      invariantKind: "departure",
      statement: "The one road to the turn-end read is typed by hand.",
    },
    {
      invariantKind: "departure",
      statement: "The reading a turn end is taken through is the turn-end-reading module.",
    },
  ],
} as const satisfies Module
