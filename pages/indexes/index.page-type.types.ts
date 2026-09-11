import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"
import type { Test } from "akasha/code-system/modules/properties/test.code-file-property.ts"
import type { IndexName } from "akasha/pages/indexes/properties/index-name.text-property.ts"

export type Index = Module & {
  name: IndexName
  test: Test
}
