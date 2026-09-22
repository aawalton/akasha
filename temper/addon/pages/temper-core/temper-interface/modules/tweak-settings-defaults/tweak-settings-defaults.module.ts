import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tweakSettingsDefaults = {
  id: "01a06115-1ad4-7c87-8227-90cbd0e07c05",
  type: "page-type/module",
  slug: "tweak-settings-defaults",
  definition: "every interface tweak setting, with its starting value",
  code: "ts",
} as const satisfies Module
