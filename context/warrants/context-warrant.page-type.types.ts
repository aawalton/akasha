import type { Module } from "../../code-system/modules/module.page-type.ts"
import type { Test } from "../../code-system/modules/properties/test.code-file-property.ts"
import type { RunsOnRead } from "./properties/runs-on-read.boolean-property.ts"
import type { RunsOnWrite } from "./properties/runs-on-write.boolean-property.ts"
import type { Transitive } from "./properties/transitive.boolean-property.ts"

export type ContextWarrant = Module & {
  test: Test
  runsOnRead: RunsOnRead
  runsOnWrite: RunsOnWrite
  transitive: Transitive
}
