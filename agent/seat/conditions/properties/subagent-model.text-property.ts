import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const subagentModel = {
  id: "01a06861-f664-7cf4-a6e6-849205f43fff",
  type: "page-type/text-property",
  slug: "subagent-model",
  propertySlug: "subagent-model",
  definition: "the model the subagents of a seat use",
  maxLength: 40,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent whose kind names no model answers on the model named here.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
