import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const titleName = {
  id: "01a1837e-a568-7888-acfc-9adb9d0e11c7",
  type: "page-type/text-property",
  slug: "title-name",
  propertySlug: "title-name",
  definition: "what a world calls one of the titles it gives",
  maxLength: 40,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A world stating none calls its titles Title.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-28T17:11:17.607Z",
  updatedAt: "2026-10-28T17:11:17.607Z",
} as const satisfies TextProperty
