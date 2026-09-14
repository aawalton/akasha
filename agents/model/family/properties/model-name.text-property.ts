import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const modelName = {
  id: "01a05a43-f8db-7b4e-86f6-e79220f0d6eb",
  type: "text-property",
  slug: "model-name",
  propertySlug: "name",
  definition: "the name a call carries to reach this family's model",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The name is the model provider's own rather than a name akasha coins.",
    },
    {
      invariantKind: "departure",
      statement: "A family names the one model calls reach today.",
    },
    {
      invariantKind: "upkeep",
      statement: "A family names a model the provider still answers for.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
