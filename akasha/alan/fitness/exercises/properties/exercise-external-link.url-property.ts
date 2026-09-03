import type { UrlProperty } from "@akasha/pages-system/url-property"

export type ExerciseExternalLink = string

export const exerciseExternalLink = {
  id: "01a0657e-2bbf-7c94-837e-2188bc435439",
  pageTypeSlug: "url-property",
  slug: "exercise-external-link",
  propertySlug: "exercise-external-link",
  definition: "where the movement is described in the catalogue it came from",
  max: 200,
} as const satisfies UrlProperty
