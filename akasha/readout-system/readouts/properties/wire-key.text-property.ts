import type { TextProperty } from "@akasha/pages-system/text-property"

export type WireKey = string

export const wireKey = {
  id: "01a05446-e768-7d56-aeef-7ab30139e500",
  pageTypeSlug: "text-property",
  slug: "wire-key",
  propertySlug: "wire-key",
  definition: "the key a reading travels under on the wire",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every readout states a wire key of its own.",
    },
    {
      invariantKind: "departure",
      statement: "No readout falls back to its slug on the wire.",
    },
  ],
} as const satisfies TextProperty
