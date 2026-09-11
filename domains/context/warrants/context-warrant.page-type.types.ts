import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"
import type { Test } from "akasha/code-system/modules/properties/test.code-file-property.types.ts"
import type { RunsOnRead } from "akasha/domains/context/warrants/properties/runs-on-read.boolean-property.types.ts"
import type { RunsOnWrite } from "akasha/domains/context/warrants/properties/runs-on-write.boolean-property.types.ts"
import type { Transitive } from "akasha/domains/context/warrants/properties/transitive.boolean-property.types.ts"

export type ContextWarrant = Module & {
  test: Test
  runsOnRead: RunsOnRead
  runsOnWrite: RunsOnWrite
  transitive: Transitive
}
