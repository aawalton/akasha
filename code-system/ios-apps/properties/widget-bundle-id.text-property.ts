import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type WidgetBundleId = string

export const widgetBundleId = {
  id: "01a068c9-394b-7970-bbf3-abbb796160af",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "widget-bundle-id",
  propertySlug: "widget-bundle-id",
  definition: "the name a phone knows an app's widgets by",
  maxLength: 155,
  nameFormat: null,
} as const satisfies TextProperty
