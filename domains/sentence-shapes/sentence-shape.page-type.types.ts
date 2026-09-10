import type { Module } from "../../code-system/modules/module.page-type.types.ts"
import type { Test } from "../../code-system/modules/properties/test.code-file-property.ts"
import type { Allowed } from "./properties/allowed.boolean-property.types.ts"
import type { Reason } from "./properties/reason.text-property.ts"

export type SentenceShape = Module & {
  test: Test
  allowed?: Allowed
  reason?: Reason
}
