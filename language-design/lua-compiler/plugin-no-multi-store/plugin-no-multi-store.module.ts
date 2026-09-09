import type { Module } from "@akasha/code/module"

export const pluginNoMultiStore = {
  id: "01a06758-8e6a-7000-9d4d-5715c576fff2",
  pageTypeSlug: "module",
  type: "module",
  slug: "plugin-no-multi-store",
  definition: "an error on a LuaMultiReturn call used outside destructuring or return",
  code: "ts",
} as const satisfies Module
