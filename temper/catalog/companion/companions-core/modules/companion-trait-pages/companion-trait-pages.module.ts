import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionTraitPages = {
  id: "01a0d625-d1ec-7d5d-af90-b993fa76bbd5",
  type: "page-type/module",
  slug: "companion-trait-pages",
  definition: "every companion trait page, in the order of its build-hash place",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The trait pages are imported rather than read, so an add-on has them with no catalogue read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The trait pages are put in order by the build-hash place each states.",
    },
  ],
} as const satisfies Module
