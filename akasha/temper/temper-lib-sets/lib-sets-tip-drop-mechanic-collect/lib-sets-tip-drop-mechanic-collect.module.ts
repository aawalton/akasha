import type { Module } from "@akasha/code-system/module"

export const libSetsTipDropMechanicCollect = {
  id: "01a06231-8f1e-710d-bc09-a50c2ddb141c",
  pageTypeSlug: "module",
  slug: "lib-sets-tip-drop-mechanic-collect",
  definition: "the zone and mechanic names for one set gathered into the shared scratch tables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Zone ids repeated within one set are gathered into groups keyed by zone id.",
    },
    {
      invariantKind: "departure",
      statement: "A named list of set ids is exempt from the missing-zone-data complaint.",
    },
    {
      invariantKind: "departure",
      statement: "The computed grouping is written back onto the given set data.",
    },
  ],
} as const satisfies Module
