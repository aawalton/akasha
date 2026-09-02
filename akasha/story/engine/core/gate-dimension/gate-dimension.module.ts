import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const gateDimension = {
  id: "01a05b71-e543-7cfb-8429-4aa935535c0d",
  pageTypeSlug: "module",
  slug: "gate-dimension",
  definition: "one dimension a turn is judged on before it may be published",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A dimension may name the sort of game the dimension is suspended in.",
    },
  ],
} as const satisfies Module
