import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionWeaponTypes = {
  id: "01a06108-0770-70cf-94b7-bd4a064ac2f6",
  type: "page-type/module",
  slug: "companion-weapon-types",
  definition: "every weapon a companion may hold, with whether the weapon takes both hands",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This table is written out from the companion pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A weapon type's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A weapon type moved to another place breaks every build hash saved.",
    },
  ],
  hashIndexed: ["COMPANION_WEAPON_TYPE_DATA"],
} as const satisfies Module
