import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const visitExtensionVararg = {
  id: "01a06758-8eba-7001-acbf-7dc0f665f162",
  type: "module",
  slug: "visit-extension-vararg",
  definition: "the test recognizing the file-scope $vararg constant",
  code: "ts",
} as const satisfies Module
