import type { Command } from "akasha/commands/command.page-type.types.ts"

export const measureClaudeAccountUsage = {
  id: "01a0796e-6118-7440-9744-e4d725a51a0a",
  type: "command",
  slug: "measure-claude-account-usage",
  definition: "the command saying what each account has spent of its two windows",
  code: "ts",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A fleet answered as holding nobody is the pages being wrong.",
    },
    {
      invariantKind: "departure",
      statement: "The account the picker would take next is marked in the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A fleet's usage is read upstream before the fleet is answered.",
    },
    {
      invariantKind: "departure",
      statement: "An account that was not refreshed is named under the numbers.",
    },
    {
      invariantKind: "departure",
      statement:
        "An account that was not refreshed is answered from the usage already beside its page.",
    },
    {
      invariantKind: "absence",
      statement: "A run renews no token.",
    },
    {
      invariantKind: "absence",
      statement: "A run starts no rate-limit window.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes no value the commit has.",
    },
  ],
  name: "usage",
} as const satisfies Command
