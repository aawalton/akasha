import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionWeaponRoleMatch = {
  id: "01a06152-c2d9-702b-a7bf-5b763c5df9fa",
  pageTypeSlug: "module",
  slug: "companion-weapon-role-match",
  definition: "the pairing of a companion's two equipped weapons with a weapon role",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A weapon role is read back from the weapons rather than stored on the build.",
    },
    {
      invariantKind: "constraint",
      statement: "A build whose weapons match no role reads as the no-weapon-role entry.",
    },
    {
      invariantKind: "departure",
      statement:
        "Choosing the weapons a role calls for picks at random among the types the role permits.",
    },
  ],
} as const satisfies Module
