import type { Module } from "akasha/code/module/module.page-type.types.ts"
import type { Test } from "akasha/code/module/properties/test.code-file-property.types.ts"
import type { RunsOnRead } from "akasha/domain/context/warrant/properties/runs-on-read.boolean-property.types.ts"
import type { RunsOnWrite } from "akasha/domain/context/warrant/properties/runs-on-write.boolean-property.types.ts"
import type { Transitive } from "akasha/domain/context/warrant/properties/transitive.boolean-property.types.ts"

export type ContextWarrant = Module & {
  test: Test
  runsOnRead: RunsOnRead
  runsOnWrite: RunsOnWrite
  transitive: Transitive
}
