import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const providerModel = {
  id: "01a0a58f-cc4a-7894-a509-4e7368942ded",
  type: "page-type/text-property",
  slug: "provider-model",
  propertySlug: "provider-model",
  definition: "the model akasha asks a provider for by the provider's own name",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The name is the provider's own rather than the name the caller asked for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name of the provider's own is served by that model rather than mapped to one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A provider akasha asks for whatever the caller asked for states none.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
