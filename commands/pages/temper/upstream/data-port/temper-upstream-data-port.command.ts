import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperUpstreamDataPort = {
  id: "01a0603c-c1da-795b-8baf-e00c1b4eb588",
  type: "command",
  slug: "temper-upstream-data-port",
  definition:
    "the command bringing an upstream game library's data into the files this repository has",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One call ports one library.",
    },
    {
      invariantKind: "departure",
      statement: "The port is written whole rather than merged.",
    },
    {
      invariantKind: "departure",
      statement: "A library the port list does not hold refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A run that wrote before it threw says in its refusal what that run had written.",
    },
    {
      invariantKind: "departure",
      statement: "A fault carries the code that fault names and says where it was thrown.",
    },
  ],
  name: "data-port",
  arguments: [
    { argument: "argument/code-root" },
    { argument: "argument/library", required: true, saidAs: "word" },
  ],
} as const satisfies Command
