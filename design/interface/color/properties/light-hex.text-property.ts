import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const lightHex = {
  id: "01a16f73-defc-78ba-807a-64f3044232e9",
  type: "page-type/text-property",
  slug: "light-hex",
  propertySlug: "light-hex",
  definition: "the color written as hex for the light scheme",
  maxLength: 20,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A color stating no light hex is drawn in its hex in the light scheme.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-24T19:47:07.131Z",
  updatedAt: "2026-10-24T19:47:07.131Z",
} as const satisfies TextProperty
