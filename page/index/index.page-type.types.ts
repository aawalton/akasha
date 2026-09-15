import type { Module } from "akasha/code/module/module.page-type.types.ts"
import type { Test } from "akasha/code/module/properties/test.code-file-property.types.ts"
import type { IndexName } from "akasha/page/index/properties/index-name.text-property.types.ts"
import type { IndexTracked } from "akasha/page/index/properties/index-tracked.boolean-property.types.ts"

export type Index = Module & {
  name: IndexName
  test: Test
  tracked?: IndexTracked
}
