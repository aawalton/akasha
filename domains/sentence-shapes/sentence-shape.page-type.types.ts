import type { Module } from "akasha/code/modules/module.page-type.types.ts"
import type { Test } from "akasha/code/modules/properties/test.code-file-property.types.ts"
import type { Allowed } from "akasha/domains/sentence-shapes/properties/allowed.boolean-property.types.ts"
import type { Reason } from "akasha/domains/sentence-shapes/properties/reason.text-property.types.ts"

export type SentenceShape = Module & {
  test: Test
  allowed?: Allowed
  reason?: Reason
}
