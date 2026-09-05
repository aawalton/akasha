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
        "A seat starts for an unstated address only if the sender is an agent or the address is a person's.",
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
      statement: "A start or a waking that outruns its patience is left, and the reach refused.",
    },
    {
      invariantKind: "departure",
      statement: "The sender is the parent the started seat is handed.",
    },
    {
      invariantKind: "departure",
      statement: "The message a seat is started for is the prompt that seat starts holding.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat is handed the words of a message rather than a command to fetch those words.",
    },
    {
      invariantKind: "departure",
      statement: "The words a seat is handed are marked off as data rather than as instruction.",
    },
    {
      invariantKind: "absence",
      statement: "No command is spawned to start a seat or to revive one.",
    },
  ],
} as const satisfies Module
