import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const affinityTier = {
  id: "01a0c638-b627-7eae-a3f2-3d2b5ecd79e6",
  type: "page-type/text-property",
  slug: "affinity-tier",
  propertySlug: "tier",
  definition: "the rung an affinity has climbed to on its game's ladder",
  maxLength: 40,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The most an affinity's counter may reach is read off its tier.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
