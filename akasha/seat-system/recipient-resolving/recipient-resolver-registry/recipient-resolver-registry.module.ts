import type { Module } from "@akasha/code-system/module"

export const recipientResolverRegistry = {
  id: "01a0657d-a75e-7003-ad87-1205dd4ec929",
  pageTypeSlug: "module",
  slug: "recipient-resolver-registry",
  definition:
    "the armed specs a tick walks, gathered from the declared, the seated, the personas and the people",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A spec is named once.",
    },
    {
      invariantKind: "departure",
      statement: "The first spec of a name is the spec kept.",
    },
    {
      invariantKind: "departure",
      statement: "A declared spec is kept over a persona or a person handler of the same name.",
    },
    {
      invariantKind: "departure",
      statement: "A person no persona answers for arms no spec.",
    },
  ],
} as const satisfies Module
