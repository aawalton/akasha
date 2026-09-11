import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const languageExtensionKinds = {
  id: "01a06758-8e7a-7000-91b1-5c7d032b8007",
  type: "module",
  slug: "language-extension-kinds",
  definition: "the language extension kind a type is marked with, and its call arguments",
  code: "ts",
} as const satisfies Module
