import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pluginNoTruthyNumbers = {
  id: "01a06758-8e6b-7000-abd2-1fa34307231c",
  type: "page-type/module",
  slug: "plugin-no-truthy-numbers",
  definition: "an error on a condition whose type is truthy in Lua but falsy in TypeScript",
  code: "ts",
  reachedByPath: ["default"],
  createdAt: "2026-09-03T12:57:32.011Z",
  updatedAt: "2026-09-25T16:25:23.000Z",
} as const satisfies Module
