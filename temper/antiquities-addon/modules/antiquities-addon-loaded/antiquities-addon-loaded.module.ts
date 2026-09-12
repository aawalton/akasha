import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const antiquitiesAddonLoaded = {
  id: "01a06274-b089-76d5-b517-b6dce0c49cf4",
  type: "module",
  slug: "antiquities-addon-loaded",
  definition: "what runs once the game says this add-on has loaded",
  code: "ts",
} as const satisfies Module
