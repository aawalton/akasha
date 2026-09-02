import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const extractWeapons = {
  id: "01a06271-abcf-7408-81ef-b5cd9c05faac",
  pageTypeSlug: "module",
  slug: "extract-weapons",
  definition: "the weapons on one bar of a build, read out as effect sources",
  code: "ts",
} as const satisfies Module
