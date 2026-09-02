import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionEquipmentQualities = {
  id: "01a06108-0766-785a-9dd2-ef09e0ab69e2",
  pageTypeSlug: "module",
  slug: "companion-equipment-qualities",
  definition: "every grade a piece of companion equipment is made at",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the companion pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "A quality's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A quality moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
