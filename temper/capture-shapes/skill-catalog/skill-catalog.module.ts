import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillCatalog = {
  id: "01a0604d-23a0-7e43-8eba-ed5022cb1d13",
  pageTypeSlug: "module",
  slug: "skill-catalog",
  definition: "what the game states about a skill line, its abilities and their morphs",
  code: "ts",
} as const satisfies Module
