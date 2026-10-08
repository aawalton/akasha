import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const effectCategory = {
  id: "01a0def7-2c25-794a-ac11-70dbe1ddb8fd",
  type: "page-type/text-property",
  slug: "effect-category",
  propertySlug: "effect-category",
  definition: "what a buff or debuff mostly bears on: damage, healing or protection",
  maxLength: 20,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An effect stating no category is read as utility.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-26T18:25:35.781Z",
  updatedAt: "2026-09-26T18:25:50.000Z",
} as const satisfies TextProperty
