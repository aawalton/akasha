import type { Module } from "../../code-system/modules/module.page-type.ts"

export const protectedUser = {
  id: "01a05c6d-3509-78ee-a418-3d1217065a1e",
  pageTypeSlug: "module",
  slug: "protected-user",
  definition: "the guard stopping a path from acting as Alan's real account",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a deliberate read-only opt-in reaches the protected user.",
    },
    {
      invariantKind: "departure",
      statement: "A path resolving to the protected user without one throws.",
    },
  ],
} as const satisfies Module
