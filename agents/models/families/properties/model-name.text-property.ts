import type { TextProperty } from "@akasha/pages-system/text-property"

export type ModelName = string

export const modelName = {
  id: "01a05a43-f8db-7b4e-86f6-e79220f0d6eb",
  pageTypeSlug: "text-property",
  slug: "model-name",
  propertySlug: "name",
  definition: "the name a call carries to reach this family's model",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The name is the model provider's own rather than one akasha coins.",
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
} as const satisfies TextProperty
