import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const coverRerollRefused = {
  id: "01a0e84e-3f8e-7738-bb8e-6205aa186cfb",
  type: "page-type/text-property",
  slug: "cover-reroll-refused",
  propertySlug: "cover-reroll-refused",
  definition: "why the last picture a story's reader asked to have drawn again was not drawn",
  maxLength: 2000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A cover drawn again takes this off, so it speaks only for the last ask.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-28T13:57:17.326Z",
  updatedAt: "2026-10-03T19:50:21.000Z",
} as const satisfies TextProperty
