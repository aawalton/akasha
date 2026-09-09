import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchSeat = {
  id: "01a06863-264d-7226-9284-b759229ac5a6",
  pageTypeSlug: "module",
  type: "module",
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
        "The commands the seat ran and was refused are reported beside the answer that seat gave.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal is read from the last event carrying a refusal rather than from the exit code.",
    },
    {
      invariantKind: "departure",
      statement: "The routing this process inherited is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "The seat reaches the model service directly.",
    },
    {
      invariantKind: "departure",
      statement: "The seat runs from the repository root.",
    },
    {
      invariantKind: "departure",
      statement:
        "The seat's cost and how many turns that seat took are reported alongside the answer that seat gave.",
    },
  ],
} as const satisfies Module
