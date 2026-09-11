import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"
import type { Test } from "akasha/code-system/modules/properties/test.code-file-property.types.ts"

export type NameFormat = Module & {
  test: Test
}
