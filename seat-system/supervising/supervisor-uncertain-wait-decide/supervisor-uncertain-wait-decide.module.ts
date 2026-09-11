import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const supervisorUncertainWaitDecide = {
  id: "01a0686d-9d5e-7005-9d03-50cd047c0404",
  pageTypeSlug: "module",
  type: "module",
  slug: "supervisor-uncertain-wait-decide",
  definition:
    "whether a seat held up by a claimant nobody can read has been held up long enough to escalate",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat no longer blocked forgets how long that seat was blocked for.",
    },
    {
      invariantKind: "departure",
      statement:
        "A block is timed from the first tick that read that block rather than from the seat's start.",
    },
    {
      invariantKind: "departure",
      statement: "One unbroken block escalates once.",
    },
  ],
} as const satisfies Module
