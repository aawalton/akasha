import type { Module } from "@akasha/code-system/module"

export const surfaceColor = {
  id: "01a05c97-5300-76a3-aa25-55af6fe31b6d",
  pageTypeSlug: "module",
  slug: "surface-color",
  definition: "the greys a surface is drawn in, from the page behind to the panel in front",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The shape every color in this package is written in is declared here.",
    },
    {
      invariantKind: "departure",
      statement: "A surface rises as its number rises.",
    },
  ],
} as const satisfies Module
