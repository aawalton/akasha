import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const shalidorLibraryCollections = {
  id: "01a06358-4f7c-7197-b990-c0ab3d67d74e",
  pageTypeSlug: "module",
  slug: "shalidor-library-collections",
  definition: "the lore collections the Mages Guild keeps under Shalidor's Library",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "These collections are read out of the whole lore library by their category.",
    },
    {
      invariantKind: "departure",
      statement: "The category is named by its game index rather than by its title.",
    },
    {
      invariantKind: "constraint",
      statement: "A lore library holding no such category answers an empty list.",
    },
  ],
} as const satisfies Module
