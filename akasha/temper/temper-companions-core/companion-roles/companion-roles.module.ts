import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionRoles = {
  id: "01a06108-076d-71af-8f22-a96f6b30e038",
  pageTypeSlug: "module",
  slug: "companion-roles",
  definition: "every combination of duties a companion is built to cover",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the companion pages rather than by hand.",
    },
  ],
} as const satisfies Module
