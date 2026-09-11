import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const createOption = {
  id: "01a06158-0a72-7000-baff-30ddc3385dbf",
  type: "module",
  slug: "create-option",
  definition: "Adds a select option to a property definition and sets it on a page's value.",
  code: "ts",
} as const satisfies Module
