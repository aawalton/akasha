import type { Module } from "@akasha/code-system/module"

export const queueStep = {
  id: "01a0622e-02ab-7057-8be5-e820557f3f47",
  pageTypeSlug: "module",
  slug: "queue-step",
  definition: "the next step for a queued request while every model it could use is rate limited",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A queue with no reset ahead is exhausted.",
    },
    {
      invariantKind: "departure",
      statement: "A reset further off than the transient hold horizon is exhausted.",
    },
    {
      invariantKind: "departure",
      statement: "A reset already past counts as no wait at all.",
    },
    {
      invariantKind: "departure",
      statement: "A wait runs past its reset by the probe margin.",
    },
    {
      invariantKind: "departure",
      statement: "A wait never runs past what is left of the silent budget.",
    },
    {
      invariantKind: "departure",
      statement: "A spent silent budget ends the waiting.",
    },
    {
      invariantKind: "departure",
      statement: "A spent budget commits where the client is streaming.",
    },
    {
      invariantKind: "departure",
      statement: "A spent budget exhausts where the client is not streaming.",
    },
    {
      invariantKind: "departure",
      statement: "The silent queue budget is under the ceiling a client stream idles out at.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here waits.",
    },
  ],
} as const satisfies Module
