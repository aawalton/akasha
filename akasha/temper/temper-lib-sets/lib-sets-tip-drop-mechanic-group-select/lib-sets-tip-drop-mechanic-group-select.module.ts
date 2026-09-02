import type { Module } from "@akasha/code-system/module"

export const libSetsTipDropMechanicGroupSelect = {
  id: "01a06231-8f1e-710c-b8c6-91c1c5518292",
  pageTypeSlug: "module",
  slug: "lib-sets-tip-drop-mechanic-group-select",
  definition: "picking the distinct members of a zone group in index order",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A member with neither a mechanic name nor a location name is left out.",
    },
  ],
} as const satisfies Module
