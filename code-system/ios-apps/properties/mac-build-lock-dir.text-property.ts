import type { TextProperty } from "@akasha/pages-system/text-property"

export type MacBuildLockDir = string

export const macBuildLockDir = {
  id: "01a06289-79d3-72fb-b3b3-690920b50d97",
  pageTypeSlug: "text-property",
  slug: "mac-build-lock-dir",
  propertySlug: "mac-build-lock-dir",
  definition: "where an app's builds take their lock on the mac",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
