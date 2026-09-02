import type { Module } from "@akasha/code-system/module"

export const companionQolRapport = {
  id: "01a0611d-84c9-7d1c-bcd6-6f53dc233a78",
  pageTypeSlug: "module",
  slug: "companion-qol-rapport",
  definition: "showing rapport as a number on the companion overview",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The label is added to the game's own rapport bar control.",
    },
  ],
} as const satisfies Module
