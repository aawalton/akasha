import type { Module } from "akasha/code/module/module.page-type.types.ts"
import type { Test } from "akasha/code/module/properties/test.code-file-property.types.ts"
import type { Allowed } from "akasha/domain/sentence-shape/properties/allowed.boolean-property.types.ts"
import type { Reason } from "akasha/domain/sentence-shape/properties/reason.text-property.types.ts"

export type SentenceShape = Module & {
  test: Test
  allowed?: Allowed
  reason?: Reason
}
