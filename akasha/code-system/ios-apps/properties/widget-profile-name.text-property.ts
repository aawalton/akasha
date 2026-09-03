import type { TextProperty } from "@akasha/pages-system/text-property"

export type WidgetProfileName = string

export const widgetProfileName = {
  id: "01a068c9-394b-7587-af7d-e66c162badae",
  pageTypeSlug: "text-property",
  slug: "widget-profile-name",
  propertySlug: "widget-profile-name",
  definition: "the App Store profile an app's widgets are signed with",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
