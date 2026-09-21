import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dataEncodeSurface = {
  id: "01a06061-969e-7d0d-b494-268228c7f6a5",
  type: "page-type/module",
  slug: "data-encode-surface",
  definition: "the calls and the alphabet the rest of the bundle reaches the encoder by",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The alphabet and both lookups are handed out for a caller to read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty table is handed out for a caller to keep working notes in.",
    },
  ],
} as const satisfies Module
