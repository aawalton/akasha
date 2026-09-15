import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const protectedUser = {
  id: "01a05c6d-3509-78ee-a418-3d1217065a1e",
  type: "module",
  slug: "protected-user",
  definition: "the guard stopping a path from acting as Alan's real account",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a deliberate read-only opt-in reaches the protected user.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path resolving to the protected user without one throws.",
    },
  ],
} as const satisfies Module
