import type { Module } from "@akasha/code-system/module"

export const gatedWrite = {
  id: "01a06949-b281-7b8d-ae3f-bc451ba4ebb7",
  pageTypeSlug: "module",
  slug: "gated-write",
  definition: "what came of a write through the gate, and the reason where it was refused",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run is its exit code together with what it printed.",
    },
    {
      invariantKind: "departure",
      statement: "Only a refusal carries a reason with it.",
    },
    {
      invariantKind: "departure",
      statement: "The reason for a refusal is read out of the report the run printed.",
    },
    {
      invariantKind: "departure",
      statement: "A line is a failure where it opens with a bracketed name followed by fail.",
    },
    {
      invariantKind: "departure",
      statement: "Several failures in one report are joined with a semicolon.",
    },
    {
      invariantKind: "departure",
      statement: "A report naming no failure comes back whole with its edges trimmed.",
    },
  ],
} as const satisfies Module
