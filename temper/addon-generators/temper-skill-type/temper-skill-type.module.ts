import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const temperSkillType = {
  id: "01a0607c-1792-7a71-9644-92f5e54caa12",
  pageTypeSlug: "module",
  type: "module",
  slug: "temper-skill-type",
  definition: "the skill types data file, rendered from pages",
  code: "ts",
} as const satisfies Module
