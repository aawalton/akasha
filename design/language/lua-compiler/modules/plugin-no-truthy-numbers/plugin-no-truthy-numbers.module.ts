import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const pluginNoTruthyNumbers = {
  id: "01a06758-8e6b-7000-abd2-1fa34307231c",
  type: "module",
  slug: "plugin-no-truthy-numbers",
  definition: "an error on a condition whose type is truthy in Lua but falsy in TypeScript",
  code: "ts",
} as const satisfies Module
