import type { Module } from "../../../../../code-system/modules/module.page-type.ts"
import type { Test } from "../../../../../code-system/modules/properties/test.code-file-property.ts"

export type SyntaxRule = Module & {
  test: Test
}
