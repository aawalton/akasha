import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const queueStep = {
  id: "01a0622e-02ab-7057-8be5-e820557f3f47",
  type: "module",
  slug: "queue-step",
  definition: "the next step for a queued request while every model it could use is rate limited",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A queue with no reset ahead is exhausted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reset further off than the transient hold horizon is exhausted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reset already past counts as no wait at all.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A wait runs past its reset by the probe margin.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A wait never runs past the remainder of the silent budget.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A spent silent budget ends the waiting.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A spent budget commits where the client is streaming.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A spent budget exhausts where the client is not streaming.",
    },

    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here waits.",
    },
  ],
} as const satisfies Module
