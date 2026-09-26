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
      statement: "A weapon type is read from its page rather than from a copy in code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon type's id stays in code, because rules name weapon types by id.",
    },
  ],
} as const satisfies Module
