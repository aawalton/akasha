import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionWeaponRoles = {
  id: "01a06108-076e-73a3-92eb-0f178131ebd0",
  pageTypeSlug: "module",
  slug: "companion-weapon-roles",
  definition: "every pairing of weapons a companion is built around",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the companion pages rather than by hand.",
    },
  ],
} as const satisfies Module
