import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchSeat = {
  id: "01a06863-264d-7226-9284-b759229ac5a6",
  pageTypeSlug: "module",
  slug: "monarch-seat",
  definition: "the seat a categorization agent runs in, and what it was allowed to reach",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The seat may reach the evidence module and nothing else.",
    },
    {
      invariantKind: "departure",
      statement:
        "What the seat ran and what it was refused are both reported, not only what it said.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal is read from the last event carrying one rather than from the exit code.",
    },
    {
      invariantKind: "departure",
      statement:
        "The routing this process inherited is dropped, so the seat reaches the model service directly.",
    },
    {
      invariantKind: "departure",
      statement: "The seat runs from the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "What it cost and how many turns it took are reported alongside what it said.",
    },
  ],
} as const satisfies Module
