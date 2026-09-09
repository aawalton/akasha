import type { Command } from "../../../../command.page-type.ts"

export const measureClaudeAccountsUsage = {
  id: "01a0796e-6118-7440-9744-e4d725a51a0a",
  pageTypeSlug: "command",
  slug: "measure-claude-accounts-usage",
  definition: "the command saying what each account has spent of its two windows",
  code: "ts",
  changeKind: "change-mechanical",
  taking: [],
  helpNotes: [
    "each account's usage is read upstream first, and what is read lands beside that account.",
    "reading usage costs nothing and starts no window.",
    "renewing a token is the upkeep service's alone, so a lapsed account is passed over and named.",
    "the `>` names the account the picker would take right now.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A fleet answered as holding nobody is the pages being wrong.",
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
} as const satisfies Command
