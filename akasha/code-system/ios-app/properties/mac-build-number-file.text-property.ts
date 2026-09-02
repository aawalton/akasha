import type { TextProperty } from "@akasha/pages-system/text-property"

export type MacBuildNumberFile = string

export const macBuildNumberFile = {
  id: "01a06289-79d4-743e-a265-9222fcd03283",
  pageTypeSlug: "text-property",
  slug: "mac-build-number-file",
  propertySlug: "mac-build-number-file",
  definition: "where the number an app's next build takes is kept on the mac",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
