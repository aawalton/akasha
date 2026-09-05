import type { TextProperty } from "@akasha/pages/text-property"

export type StillPath = string

export const stillPath = {
  id: "01a06599-ee09-7009-8856-62cef5cf1699",
  pageTypeSlug: "text-property",
  slug: "still-path",
  propertySlug: "still-path",
  definition: "the path to a frame taken from an episode",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A still is a frame from the episode rather than artwork drawn for that episode.",
    },
  ],
} as const satisfies TextProperty
