import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersTaskHud = {
  id: "01a062ee-f13b-7078-8d2b-e3b2c0499a1f",
  pageTypeSlug: "module",
  slug: "characters-task-hud",
  definition: "the heads-up display of what is left to do, built once and redrawn on every change",
  code: "ts",
} as const satisfies Module
