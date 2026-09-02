import type { Module } from "@akasha/code-system/module"

export const companionQolCore = {
  id: "01a0611d-84c6-7ad9-9eb6-645084830a14",
  pageTypeSlug: "module",
  slug: "companion-qol-core",
  definition: "summoning and dismissing the active companion",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Which companion was dismissed is remembered so the same one comes back.",
    },
  ],
} as const satisfies Module
