import type { Module } from "../code-system/module/module.page-type.ts"

export const judging = {
  id: "01a04b82-aed3-7a15-92da-b7f37135a539",
  pageTypeSlug: "module",
  slug: "judging",
  definition: "the change a check is shown, and the refusals it answers with",
  code: "ts",
  requiredReadingSlugs: ["domain/akasha-check"],
  design: ["Nothing here imports a check or a door."],
} as const satisfies Module
