import type { Command } from "akasha/commands/command.page-type.types.ts"

export const agentStrays = {
  id: "01a09cd6-14dc-7b7c-830c-2f44dc2f73c3",
  type: "command",
  slug: "agent-strays",
  definition: "the command naming every live process left running by a subagent that has returned",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One line names each stray process.",
    },
    {
      invariantKind: "departure",
      statement: "A line names the process, the subagent it acts under and its command line.",
    },
    {
      invariantKind: "departure",
      statement: "A line names how long the process has run and how much processor it took.",
    },
    {
      invariantKind: "departure",
      statement: "A process whose times will not be read is named with its times left unsaid.",
    },
    {
      invariantKind: "departure",
      statement: "A closing line names every subagent the reading could not tell about.",
    },
    {
      invariantKind: "departure",
      statement: "A reading naming no stray says that nothing is stray.",
    },
    {
      invariantKind: "departure",
      statement: "The reading and the reader of a process's times are handed in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here signals or ends a process.",
    },
    {
      invariantKind: "absence",
      statement: "No subagent page is read.",
    },
  ],
  name: "strays",
  arguments: [],
} as const satisfies Command
