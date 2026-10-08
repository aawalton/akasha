import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const wireKey = {
  id: "01a05446-e768-7d56-aeef-7ab30139e500",
  type: "page-type/text-property",
  slug: "wire-key",
  propertySlug: "wire-key",
  definition: "the key a reading travels under on the wire",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every readout states a wire key of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No readout falls back to its slug on the wire.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-30T20:05:28.040Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies TextProperty
