import type { Module } from "@akasha/code-system/module"

export const libSetsCoreSetItemidsFiltered = {
  id: "01a061fc-ceec-7456-9d7d-84602a2f2336",
  pageTypeSlug: "module",
  slug: "lib-sets-core-set-itemids-filtered",
  definition: "keeping only the item ids of a set that match the equip, trait or enchant asked for",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "An armor type and a weapon type may not both be asked for at once.",
    },
    {
      invariantKind: "departure",
      statement: "Matching a filter costs one built item link per item id.",
    },
  ],
} as const satisfies Module
