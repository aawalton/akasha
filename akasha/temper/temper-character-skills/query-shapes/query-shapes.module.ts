import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const queryShapes = {
  id: "01a06187-b3a3-7eb8-8802-5c8042236869",
  pageTypeSlug: "module",
  slug: "query-shapes",
  definition: "the little bit of armour and weapon shape a skill query needs to read",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A skill query reads the weight or the weapon type off a slot.",
    },
  ],
} as const satisfies Module
