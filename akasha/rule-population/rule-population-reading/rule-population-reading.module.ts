import type { Module } from "@akasha/code-system/module"

export const rulePopulationReading = {
  id: "01a0686c-fd2c-7003-af85-079e3b92fbd4",
  pageTypeSlug: "module",
  slug: "rule-population-reading",
  definition: "what every enforcement rule weighed, read in one pass and filed for the reader",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What a rule weighed is counted rather than what the rule found.",
    },
    {
      invariantKind: "departure",
      statement: "A rule that weighed nothing is named in the reading rather than refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule offering no population at all is counted as having weighed nothing rather than as unread.",
    },
    {
      invariantKind: "departure",
      statement: "The population is the checkout as it now stands, with no graph cache read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading that will not land in the reader's mailbox throws, so nothing waiting is never read as nothing wrong.",
    },
  ],
} as const satisfies Module
