import type { UrlProperty } from "@akasha/pages-system/url-property"

export type ExerciseExternalLink = string

export const exerciseExternalLink = {
  id: "01a0657b-1ad2-735b-b34f-72959c69d8a0",
  pageTypeSlug: "url-property",
  slug: "exercise-external-link",
  propertySlug: "exercise-external-link",
  definition: "where the movement is described in the catalogue it came from",
  max: 200,
} as const satisfies UrlProperty
