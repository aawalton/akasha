import type { Module } from "@akasha/code-system/module"

export const companionQolTypes = {
  id: "01a0611d-84ce-7b51-8ddf-74ea1f57955c",
  pageTypeSlug: "module",
  slug: "companion-qol-types",
  definition: "the shapes the folded-in companion quality-of-life settings are held in",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies Module
