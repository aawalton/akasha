import type { Command } from "akasha/commands/command.page-type.types.ts"

export const claudeAccountReEnable = {
  id: "01a06861-b463-71ad-922e-5b006cdebd6f",
  type: "command",
  slug: "claude-account-re-enable",
  definition:
    "the command putting one claude account back in the pool its subscription shut it out of",
  code: "ts",
  taking: [{ said: "<account>", takes: "the account to put back, named as its page is named" }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The picker counts the account again from the next ask.",
    },
    {
      invariantKind: "departure",
      statement: "One call names one account.",
    },
    {
      invariantKind: "departure",
      statement: "An account no page is filed for is refused rather than made.",
    },
    {
      invariantKind: "departure",
      statement: "An account with no reason is answered as already standing.",
    },
    {
      invariantKind: "departure",
      statement: "The reason is cleared beside the page rather than in it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a token or asks a model.",
    },
  ],
  name: "re-enable",
} as const satisfies Command
