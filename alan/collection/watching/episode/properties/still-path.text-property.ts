import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const stillPath = {
  id: "01a06599-ee09-7009-8856-62cef5cf1699",
  type: "page-type/text-property",
  slug: "still-path",
  propertySlug: "still-path",
  definition: "the path to a frame taken from an episode",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A still is a frame from the episode rather than artwork drawn for that episode.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T04:49:41.897Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies TextProperty
