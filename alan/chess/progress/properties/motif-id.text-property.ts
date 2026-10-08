import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const motifId = {
  id: "01a06582-bd62-7e31-83b4-f252d4b9e91c",
  type: "page-type/text-property",
  slug: "motif-id",
  propertySlug: "motif-id",
  definition: "a motif's Lichess theme",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "A Lichess theme is no page.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T04:24:22.114Z",
  updatedAt: "2026-09-22T22:39:48.000Z",
} as const satisfies TextProperty
