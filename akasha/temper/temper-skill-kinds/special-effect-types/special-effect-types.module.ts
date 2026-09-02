import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const specialEffectTypes = {
  id: "01a060db-b2be-7aac-9073-574868af28d7",
  pageTypeSlug: "module",
  slug: "special-effect-types",
  definition: "the ten skill effects no damage number or heal number says",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the skill pages rather than by hand.",
    },
  ],
} as const satisfies Module
