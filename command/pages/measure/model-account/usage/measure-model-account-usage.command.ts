import type { Command } from "akasha/command/command.page-type.types.ts"

export const measureModelAccountUsage = {
  id: "01a0796e-6118-7440-9744-e4d725a51a0a",
  type: "page-type/command",
  slug: "measure-model-account-usage",
  definition: "the command saying what each account has spent of its two windows",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A fleet answered as holding nobody is the pages being wrong.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The account the picker would take next is marked in the answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fleet's usage is read upstream before the fleet is answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account that was not refreshed is named under the numbers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An account that was not refreshed is answered from the usage already beside its page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run renews no token.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run starts no rate-limit window.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run writes no value the commit has.",
    },
  ],
  name: "usage",
  arguments: [],
} as const satisfies Command
