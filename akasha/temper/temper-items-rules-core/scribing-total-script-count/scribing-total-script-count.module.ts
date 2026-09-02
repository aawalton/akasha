import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const scribingTotalScriptCount = {
  id: "01a060d9-44cc-7857-8133-d0c4c0bfc797",
  pageTypeSlug: "module",
  slug: "scribing-total-script-count",
  definition: "how many scribing scripts the game holds across focus, signature and affix",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This count is written out from the scribing script pages rather than by hand.",
    },
  ],
} as const satisfies Module
