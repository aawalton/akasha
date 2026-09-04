import type { TextProperty } from "@akasha/pages-system/text-property"

export type WidgetBundleId = string

export const widgetBundleId = {
  id: "01a068c9-394b-7970-bbf3-abbb796160af",
  pageTypeSlug: "text-property",
  slug: "widget-bundle-id",
  propertySlug: "widget-bundle-id",
  definition: "the name a phone knows an app's widgets by",
  max: 155,
  nameFormatSlug: null,
} as const satisfies TextProperty
