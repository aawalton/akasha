import type { Command } from "@akasha/command-system/command"

export const claudeAccountReEnable = {
  id: "01a06861-b463-71ad-922e-5b006cdebd6f",
  pageTypeSlug: "command",
  slug: "claude-account-re-enable",
  definition:
    "the command putting one claude account back in the pool its subscription shut it out of",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [{ said: "<account>", takes: "the account to put back, named as its page is named" }],
  helpNotes: [
    "an account is shut out when the gateway finds its subscription inactive, and the reason it found is kept beside the account's page.",
    "this clears that reason, and the picker counts the account again from the next ask.",
    "the gateway clears the reason itself when it next finds the subscription active, so this is for putting an account back before that happens rather than instead of it.",
    "an account that was never shut out is answered as already standing rather than refused.",
    "the reason is kept beside the page rather than in it, so clearing it commits nothing.",
  ],
  invariants: [
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
      statement: "An account carrying no reason is answered as already standing.",
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
} as const satisfies Command
