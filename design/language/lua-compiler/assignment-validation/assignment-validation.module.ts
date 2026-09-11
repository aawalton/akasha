import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const assignmentValidation = {
  id: "01a06758-8e75-7000-b810-541e027fbe15",
  type: "module",
  slug: "assignment-validation",
  definition: "the 'this' context mismatches found between an assignment's source and target types",
  code: "ts",
} as const satisfies Module
