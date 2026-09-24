import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const syntheticConfig = {
  id: "01a05cce-25ec-7ff8-bc53-96b43a0253f7",
  type: "page-type/module",
  slug: "synthetic-config",
  definition: "a view config built for a listing that states none of its own",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The parameter naming which view is shown narrows the listing by nothing.",
    },
  ],
} as const satisfies Module
