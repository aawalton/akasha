import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skyshardsPart3 = {
  id: "01a061a8-9c68-7aa1-9275-7c9b519b7356",
  pageTypeSlug: "module",
  slug: "skyshards-part-3",
  definition:
    "one run of the skyshard placement table, in the order the whole table names its maps",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These records are one unbroken run of the whole table's order.",
    },
    {
      invariantKind: "departure",
      statement: "This run is the add-on's own source rather than anything akasha derives.",
    },
  ],
} as const satisfies Module
