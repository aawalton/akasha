import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const widgetBundleId = {
  id: "01a068c9-394b-7970-bbf3-abbb796160af",
  type: "page-type/text-property",
  slug: "widget-bundle-id",
  propertySlug: "widget-bundle-id",
  definition: "the name of an app's widgets on a phone",
  maxLength: 155,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
