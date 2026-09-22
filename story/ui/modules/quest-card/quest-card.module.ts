import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questCard = {
  id: "01a0629b-6836-748b-85fa-25ae3e67490f",
  type: "page-type/module",
  slug: "quest-card",
  definition: "a quest's status badge beside its objective, its conditions and its reward",
  code: "tsx",
} as const satisfies Module
