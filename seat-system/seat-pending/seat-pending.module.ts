import type { Module } from "@akasha/code-system/module"

export const seatPending = {
  id: "01a0657f-4492-7003-914d-556c08c04bef",
  pageTypeSlug: "module",
  slug: "seat-pending",
  definition: "the four verdicts a seat's pendency is read as, and what decides between them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat that stopped itself is pending for having stopped itself.",
    },
    {
      invariantKind: "departure",
      statement: "A seat holding a live child is pending on the child.",
    },
    {
      invariantKind: "departure",
      statement: "A seat that sent nothing is not awaiting a reply.",
    },
    {
      invariantKind: "departure",
      statement: "Stopping alone is allowed for a seat that stopped itself or holds a live child.",
    },
  ],
} as const satisfies Module
