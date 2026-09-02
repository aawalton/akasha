import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skyshardsData = {
  id: "01a061a8-9c65-7706-be69-f1c06fb7d9c0",
  pageTypeSlug: "module",
  slug: "skyshards-data",
  definition: "every zone the add-on knows a skyshard in, gathered from three runs in order",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The runs are gathered in the order the whole table names.",
    },
  ],
} as const satisfies Module
