import type { TextProperty } from "@akasha/pages/text-property"

export type MacBuildNumberFile = string

export const macBuildNumberFile = {
  id: "01a06289-79d4-743e-a265-9222fcd03283",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "mac-build-number-file",
  propertySlug: "mac-build-number-file",
  definition: "where the number an app's next build takes is kept on the mac",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
