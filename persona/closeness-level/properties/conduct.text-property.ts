import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const conduct = {
  id: "01a0e34c-c678-7218-bfd6-ed6f9379e3b0",
  type: "page-type/text-property",
  slug: "conduct",
  propertySlug: "conduct",
  definition: "how a persona behaves toward Alan at a rung",
  maxLength: 500,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A scene with a persona stays inside the conduct of the rung she has reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Conduct bounds what she shares, how she touches him, and how far a scene goes.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
