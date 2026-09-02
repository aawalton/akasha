import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const combatMapping = {
  id: "01a05bc6-fa4a-700b-af5e-5b1aaed5213a",
  pageTypeSlug: "module",
  slug: "combat-mapping",
  definition: "a stored combatant as the combat engine takes it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A player sheet and an enemy on a floor cross over by the same route.",
    },
    {
      invariantKind: "departure",
      statement: "A skill naming neither an id nor a name is left behind.",
    },
    {
      invariantKind: "departure",
      statement: "A skill missing one name of its two names borrows the other name.",
    },
    {
      invariantKind: "absence",
      statement: "A field the engine has no use for is not carried across.",
    },
  ],
} as const satisfies Module
