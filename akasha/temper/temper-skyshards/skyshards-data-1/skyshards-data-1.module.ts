import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skyshardsData1 = {
  id: "01a061a8-9c64-77cf-97d8-cfdbc73036ab",
  pageTypeSlug: "module",
  slug: "skyshards-data-1",
  definition: "one run of the zones of the skyshard table, gathered from the runs its maps sit in",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These zones are one unbroken run of the whole table's order.",
    },
  ],
} as const satisfies Module
