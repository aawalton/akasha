import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionBulkUpdateEquipment = {
  id: "01a06152-c2c5-7e0c-8688-41d1ac8871ea",
  type: "page-type/module",
  slug: "companion-bulk-update-equipment",
  definition: "bulk replacement of a trait or quality value across companion equipment slots",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The off-hand slot is skipped in the loop and mirrored from main-hand afterward.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Mirroring to off-hand is suppressed when the main-hand weapon is two-handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot whose current value differs from the old value is left untouched.",
    },
  ],
} as const satisfies Module
