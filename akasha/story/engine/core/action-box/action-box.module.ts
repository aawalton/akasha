import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const actionBox = {
  id: "01a05b71-e543-7c6b-b7b5-f5d4ff69ead5",
  pageTypeSlug: "module",
  slug: "action-box",
  definition: "a player's pending typed actions and the moments they arrived",
  code: "ts",
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "The action box is being rebuilt.",
    },
    {
      invariantKind: "stopgap",
      statement: "Every read of the box comes back empty until the rebuild lands.",
    },
  ],
} as const satisfies Module
