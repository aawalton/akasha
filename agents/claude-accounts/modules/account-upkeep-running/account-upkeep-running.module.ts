import type { Module } from "@akasha/code/module"

export const accountUpkeepRunning = {
  id: "01a0686a-7a56-7f96-9527-a198f47be23e",
  pageTypeSlug: "module",
  type: "module",
  slug: "account-upkeep-running",
  definition: "every claude account's token and usage kept current, pass after pass",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "One process on the workstation is the only thing anywhere that renews a claude account's token.",
    },
    {
      invariantKind: "departure",
      statement:
        "Everything else that has a credential reads the credential rather than making a credential.",
    },
    {
      invariantKind: "departure",
      statement: "A pass goes through the claude-account pages in alphabetical order.",
    },
    {
      invariantKind: "departure",
      statement: "An account that is subscription-disabled is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A renewed token and a fresh usage reading are written back onto the account.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rate-limit window that has gone inactive is started again with a one-token message.",
    },
    {
      invariantKind: "departure",
      statement: "The usage is read a second time once a rate-limit window has been started again.",
    },
    {
      invariantKind: "departure",
      statement: "Accounts are a minute apart within a pass.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides which account a call goes on.",
    },
    {
      invariantKind: "departure",
      statement:
        "A restart waits out the rest of the period in which a window was triggered on any account.",
    },
    {
      invariantKind: "departure",
      statement: "Upkeep runs until stopped.",
    },
    {
      invariantKind: "departure",
      statement: "A stop ends the loop at the loop's next boundary.",
    },
    {
      invariantKind: "absence",
      statement:
        "Whether upkeep is still running is ruled on elsewhere from the stamps upkeep leaves on each page.",
    },
  ],
} as const satisfies Module
