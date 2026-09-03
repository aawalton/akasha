import type { Module } from "@akasha/code-system/module"

export const seatStatedIdentity = {
  id: "01a0686d-9d5e-7015-b484-a662b772f104",
  pageTypeSlug: "module",
  slug: "seat-stated-identity",
  definition: "what a starting seat stated, checked against the pages before the seat boots",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat that stated no attribute and no assignment has nothing to check.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stated identity that cannot be checked refuses the start rather than booting a seat holding none of it.",
    },
    {
      invariantKind: "departure",
      statement: "What the checking command said is what the caller is told.",
    },
  ],
} as const satisfies Module
