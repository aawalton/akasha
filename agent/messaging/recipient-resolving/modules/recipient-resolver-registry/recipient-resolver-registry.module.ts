import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const recipientResolverRegistry = {
  id: "01a0657d-a75e-7003-ad87-1205dd4ec929",
  type: "page-type/module",
  slug: "recipient-resolver-registry",
  definition:
    "the armed specs a tick walks, taken from the declared, the seated, the personas and the people",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A spec is named once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first spec of a name is the spec kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declared spec is kept over a persona or a person handler of the same name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person no persona answers for arms no spec.",
    },
  ],
} as const satisfies Module
