import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const questCard = {
  id: "01a0629b-6836-748b-85fa-25ae3e67490f",
  pageTypeSlug: "module",
  type: "module",
  slug: "quest-card",
  definition: "one quest's status badge beside its objective, its conditions and its reward",
  code: "tsx",
} as const satisfies Module
