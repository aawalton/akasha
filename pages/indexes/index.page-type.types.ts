import type { Module } from "akasha/code/modules/module.page-type.types.ts"
import type { Test } from "akasha/code/modules/properties/test.code-file-property.types.ts"
import type { IndexName } from "akasha/pages/indexes/properties/index-name.text-property.types.ts"

export type Index = Module & {
  name: IndexName
  test: Test
}
