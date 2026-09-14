import type { Cases } from "akasha/agent/model/test/properties/cases.page-property-entry.types.ts"
import type { ModelFamily } from "akasha/agent/model/test/properties/model-family.relation-property.types.ts"
import type { Positives } from "akasha/agent/model/test/properties/positives.file-property.types.ts"
import type { Prompt } from "akasha/agent/model/test/properties/prompt.text-property.types.ts"
import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export type ModelTest = Module & {
  modelFamily: ModelFamily
  prompt: Prompt
  cases?: Cases
  positives?: Positives
}
