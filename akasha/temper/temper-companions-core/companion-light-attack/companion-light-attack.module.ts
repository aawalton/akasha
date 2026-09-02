import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionLightAttack = {
  id: "01a06152-c2ca-7b83-b9c0-91952d593058",
  pageTypeSlug: "module",
  slug: "companion-light-attack",
  definition: "how a companion's light attack resolves",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The strongest active light attack heal buff is the only one applied on a swing.",
    },
    {
      invariantKind: "departure",
      statement: "Expired buffs are pruned from the state as a side effect of reading them.",
    },
    {
      invariantKind: "constraint",
      statement: "A next-attack damage buff is consumed by the swing the buff lands on.",
    },
  ],
} as const satisfies Module
