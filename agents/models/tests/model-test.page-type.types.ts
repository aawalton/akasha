import type { Cases } from "akasha/agents/models/tests/properties/cases.page-property-entry.types.ts"
import type { ModelFamily } from "akasha/agents/models/tests/properties/model-family.relation-property.types.ts"
import type { Prompt } from "akasha/agents/models/tests/properties/prompt.text-property.ts"
import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export type ModelTest = Module & {
  modelFamily: ModelFamily
  prompt: Prompt
  cases: Cases
}
