import type { Module } from "@akasha/code-system/module"

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
      statement: "What a rule weighed is counted rather than what it found.",
    },
    {
      invariantKind: "departure",
      statement: "One message saying which rules weighed nothing is filed in the reader's mailbox.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule that weighed nothing certifies nothing, and prints the same green as a rule that weighed everything and was satisfied.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule weighing nothing may have had its construct retired out from under it, or may never have had a population at all.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule weighing nothing is reported and never refused, the call staying a person's.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep that read no rules fails the run rather than filing an empty finding.",
    },
    {
      invariantKind: "absence",
      statement: "No graph cache is read, so the population is the repository as it now stands.",
    },
    {
      invariantKind: "departure",
      statement: "Asked for a dry run, the body is printed and nothing is filed.",
    },
  ],
} as const satisfies Module
