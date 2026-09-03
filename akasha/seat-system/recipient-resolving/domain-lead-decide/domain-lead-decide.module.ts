import type { Module } from "@akasha/code-system/module"

export const domainLeadDecide = {
  id: "01a0686d-9d5e-701a-ba33-fdc3ba8ade91",
  pageTypeSlug: "module",
  slug: "domain-lead-decide",
  definition:
    "which persona leads a domain, read from the walk up its tree, and who is reached where none does",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A domain no document declares yields no lead, and says the slug may be spelled otherwise.",
    },
    {
      invariantKind: "departure",
      statement:
        "A declared domain reaching no champion reports a tree that lost one rather than a domain nobody owns.",
    },
    {
      invariantKind: "departure",
      statement: "A recipient defaulted to carries the reason it was defaulted for.",
    },
  ],
} as const satisfies Module
