import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const catalogLandedDrop = {
  id: "01a15550-1220-7bd4-8ae2-38b66afa30ce",
  type: "page-type/module",
  slug: "catalog-landed-drop",
  definition: "a catalog already landed in akasha, replaced in the saved variables by a mark",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalog the config names as landed is replaced by the landed mark alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalog is replaced only where its mark names the saved game version.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalog is replaced only where its mark names the latest invalidation seen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalog collected again since it landed is kept whole until it lands again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mark counts as collected, so the catalog is not collected again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Catalogs are replaced once at load, after the invalidations are applied.",
    },
  ],
  createdAt: "2026-10-19T17:57:53.311Z",
  updatedAt: "2026-10-19T17:57:53.311Z",
} as const satisfies Module
