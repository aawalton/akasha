import type { Cases } from "akasha/agents/model/tests/properties/cases.page-property-entry.types.ts"
import type { ModelFamily } from "akasha/agents/model/tests/properties/model-family.relation-property.types.ts"
import type { Positives } from "akasha/agents/model/tests/properties/positives.file-property.types.ts"
import type { Prompt } from "akasha/agents/model/tests/properties/prompt.text-property.types.ts"
import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export type ModelTest = Module & {
  modelFamily: ModelFamily
  prompt: Prompt
  cases?: Cases
  positives?: Positives
}
