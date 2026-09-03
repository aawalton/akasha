import type { Module } from "@akasha/code-system/module"

export const supervisorUncertainWaitDecide = {
  id: "01a0686d-9d5e-7005-9d03-50cd047c0404",
  pageTypeSlug: "module",
  slug: "supervisor-uncertain-wait-decide",
  definition:
    "whether a seat held up by a claimant nobody can read has been held up long enough to escalate",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat no longer blocked forgets how long it was blocked for.",
    },
    {
      invariantKind: "departure",
      statement:
        "A block is timed from the first tick that read it rather than from the seat's start.",
    },
    {
      invariantKind: "departure",
      statement: "One unbroken block escalates once.",
    },
  ],
} as const satisfies Module
