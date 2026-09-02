import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionScribingProgress = {
  id: "01a06279-3a00-7000-8dbd-521db3a1f3b4",
  pageTypeSlug: "module",
  slug: "completion-scribing-progress",
  definition: "which grimoires and scripts each character has unlocked",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A character no measurement was taken of is left out.",
    },
    {
      invariantKind: "constraint",
      statement: "A script carrying no item id is left out.",
    },
  ],
} as const satisfies Module
