import type { TextProperty } from "@akasha/pages-system/text-property"

export type PointsSourcePathPrefix = string

export const pointsSourcePathPrefix = {
  id: "01a060b8-bfaf-7003-b190-9ac1c4d5df1e",
  pageTypeSlug: "text-property",
  slug: "points-source-path-prefix",
  propertySlug: "path-prefix",
  definition: "which part of the tree a persona's counted work sits under",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
