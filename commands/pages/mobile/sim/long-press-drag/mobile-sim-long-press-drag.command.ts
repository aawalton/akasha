import type { Command } from "akasha/commands/command.page-type.types.ts"

export const mobileSimLongPressDrag = {
  id: "01a0685d-ceae-7008-b721-3b37d87dca97",
  type: "command",
  slug: "mobile-sim-long-press-drag",
  definition: "the command holding a finger down on the simulator and dragging it somewhere",
  code: "ts",

  invariants: [
    {
      invariantKind: "departure",
      statement: "A gesture names where the finger goes down and where that finger ends.",
    },
    {
      invariantKind: "departure",
      statement: "A hold comes before a drag.",
    },
    {
      invariantKind: "departure",
      statement: "A drag is made of moves rather than of one jump.",
    },
    {
      invariantKind: "departure",
      statement: "A drag ending where that drag began is a gesture rather than nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a session.",
    },
  ],
  name: "long-press-drag",
  arguments: [
    { argument: "argument/x", required: true },
    { argument: "argument/y", required: true },
    { argument: "argument/to-x", required: true },
    { argument: "argument/to-y", required: true },
    { argument: "argument/hold-ms" },
    { argument: "argument/drag-steps" },
    { argument: "argument/step-ms" },
  ],
} as const satisfies Command
