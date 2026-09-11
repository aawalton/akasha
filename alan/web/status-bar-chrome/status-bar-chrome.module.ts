import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const statusBarChrome = {
  id: "01a0655d-dab8-75ba-86e4-7113251f960d",
  type: "module",
  slug: "status-bar-chrome",
  definition: "what the native status bar is told to look like",
  code: "ts",
} as const satisfies Module
