import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const poiCatalogCapture = {
  id: "01a060e2-3184-76cf-a0d0-62b8d40daca8",
  type: "page-type/module",
  slug: "poi-catalog-capture",
  definition:
    "the points of interest of every zone story zone, read into the add-on's saved variables",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Zone ids are read in a chain that ends where the game answers zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A zone with no named point of interest is left out.",
    },
  ],
  createdAt: "2026-09-02T06:50:31.684Z",
  updatedAt: "2026-09-21T15:12:26.000Z",
} as const satisfies Module
