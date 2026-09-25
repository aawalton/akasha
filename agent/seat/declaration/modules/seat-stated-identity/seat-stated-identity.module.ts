import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatStatedIdentity = {
  id: "01a0686d-9d5e-7015-b484-a662b772f104",
  type: "page-type/module",
  slug: "seat-stated-identity",
  definition: "how code matches the attributes a new seat chooses against the pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that stated no attribute and no assignment has nothing to check.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stated identity that cannot be checked refuses the start rather than a seat without that identity.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The caller is told the words the resolving function refused with.",
    },
  ],
} as const satisfies Module
