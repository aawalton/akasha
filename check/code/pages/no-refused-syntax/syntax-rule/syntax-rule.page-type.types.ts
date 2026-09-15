import type { Module } from "akasha/code/module/module.page-type.types.ts"
import type { Test } from "akasha/code/module/properties/test.code-file-property.types.ts"

export type SyntaxRule = Module & {
  test: Test
}
