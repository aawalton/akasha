import type { RunsAfter } from "akasha/change/generator/properties/runs-after.multi-relation-property.types.ts"
import type { Module } from "akasha/code/module/module.page-type.types.ts"

export type ChangeGenerator = Module & {
  runsAfter?: RunsAfter
}
