import type { FileProperty } from "@akasha/pages-system/file-property"

export type IconDrawing = "svg"

export const iconDrawing = {
  id: "01a05994-769f-72f7-b5c6-0c139190a2f0",
  pageTypeSlug: "file-property",
  slug: "icon-drawing",
  propertySlug: "icon-drawing",
  definition: "the drawing an app's icon is made from",
} as const satisfies FileProperty
