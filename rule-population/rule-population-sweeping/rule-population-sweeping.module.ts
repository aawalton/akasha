import type { Module } from "@akasha/code/module"

export const rulePopulationSweeping = {
  id: "01a0686a-7a57-7ebe-a257-9653a695a03e",
  pageTypeSlug: "module",
  slug: "rule-population-sweeping",
  definition: "what every enforcement rule weighed, read and filed for the reader",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One pass covers the whole canonical TypeScript population of this repository.",
    },
    {
      invariantKind: "departure",
      statement: "Every syntax scanner is dispatched across that whole population.",
    },
    {
      invariantKind: "departure",
      statement: "The population a rule weighed is counted rather than the faults that rule found.",
    },
    {
      invariantKind: "departure",
      statement: "One message saying which rules weighed nothing is filed in the reader's mailbox.",
    },

    {
      invariantKind: "departure",
      statement:
        "A rule weighing nothing may have had its construct retired out from under that rule.",
    },
    {
      invariantKind: "departure",
      statement: "A rule weighing nothing may never have had a population at all.",
    },
    {
      invariantKind: "departure",
      statement: "A rule weighing nothing is reported and never refused.",
    },
    {
      invariantKind: "departure",
      statement: "The call stays a person's.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep that read no rules fails the run rather than filing an empty finding.",
    },
    {
      invariantKind: "absence",
      statement: "No graph cache is read.",
    },
    {
      invariantKind: "departure",
      statement: "The population is the repository as that repository now is.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run prints the body.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run files nothing.",
    },
  ],
} as const satisfies Module
