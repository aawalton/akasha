import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setIdsAToO = {
  id: "01a060d5-2f13-7b67-ac60-358958a4c07b",
  pageTypeSlug: "module",
  slug: "set-ids-a-to-o",
  definition: "the gear sets from the no-set sentinel through the ones keyed under the letter o",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One module holding all 707 set ids would pass the byte ceiling.",
    },
  ],
} as const satisfies Module
