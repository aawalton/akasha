import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const providerModel = {
  id: "01a0a58f-cc4a-7894-a509-4e7368942ded",
  type: "page-type/text-property",
  slug: "provider-model",
  propertySlug: "provider-model",
  definition: "the name a model provider has for the model that akasha uses",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The name is the provider's own rather than the name the caller asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name of the provider's own is served by that model rather than mapped to one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A provider akasha asks for whatever the caller asked for states none.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
