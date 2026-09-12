import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const confirmSetTarget = {
  id: "01a090a4-c227-7bc1-87d7-d7b98fe5499c",
  type: "module",
  slug: "confirm-set-target",
  definition: "setting a build as a waiting entity's target once the player has confirmed",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A confirmation with no entity waiting sets no target.",
    },
    {
      invariantKind: "departure",
      statement: "The entity stops waiting before the target is set.",
    },
    {
      invariantKind: "constraint",
      statement: "A target whose arguments could not be worked out is left unset.",
    },
  ],
} as const satisfies Module
