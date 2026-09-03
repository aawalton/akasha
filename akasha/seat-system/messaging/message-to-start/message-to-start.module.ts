import type { Module } from "@akasha/code-system/module"

export const messageToStart = {
  id: "01a0686c-f06b-700d-8620-76cd6d957722",
  pageTypeSlug: "module",
  slug: "message-to-start",
  definition: "the seat a message reaches, woken or started where none is sitting there",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat already live is reached without being woken.",
    },
    {
      invariantKind: "departure",
      statement: "A seat that has stated the address before is woken rather than started anew.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat is started for an address nothing has ever stated only where the sender is an agent or the address answers to a person.",
    },
    {
      invariantKind: "departure",
      statement: "A seat started is waited on until its row reads back as stating the address.",
    },
    {
      invariantKind: "departure",
      statement: "A seat that never reads back is a refusal rather than a delivery.",
    },
    {
      invariantKind: "departure",
      statement: "A spawned command that does not answer inside its patience is killed.",
    },
  ],
} as const satisfies Module
