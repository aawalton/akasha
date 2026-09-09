import type { Module } from "../../../code-system/modules/module.page-type.ts"
import type { Cases } from "./properties/cases.page-property-entry.ts"
import type { ModelFamily } from "./properties/model-family.relation-property.ts"
import type { Prompt } from "./properties/prompt.text-property.ts"

export type ModelTest = Module & {
  modelFamily: ModelFamily
  prompt: Prompt
  cases: Cases
}
