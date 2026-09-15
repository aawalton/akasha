import type { Module } from "akasha/code/modules/module.page-type.types.ts"
import type { Test } from "akasha/code/modules/properties/test.code-file-property.types.ts"
import type { IndexName } from "akasha/pages/index/properties/index-name.text-property.types.ts"
import type { IndexTracked } from "akasha/pages/index/properties/index-tracked.boolean-property.types.ts"

export type Index = Module & {
  name: IndexName
  test: Test
  tracked?: IndexTracked
}
