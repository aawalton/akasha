import type { Module } from "../../code-system/modules/module.page-type.ts"
import type { Test } from "../../code-system/modules/properties/test.code-file-property.ts"
import type { IndexName } from "./properties/index-name.text-property.ts"

export type Index = Module & {
  name: IndexName
  test: Test
}
