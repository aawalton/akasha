import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const surfaceColor = {
  id: "01a05c97-5300-76a3-aa25-55af6fe31b6d",
  type: "module",
  slug: "surface-color",
  definition: "the shape a color is written in, and the reading of a hex into it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The shape every color in this package is written in is declared here.",
    },
  ],
} as const satisfies Module
