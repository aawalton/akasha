import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const iconDrawing = {
  id: "01a05994-769f-72f7-b5c6-0c139190a2f0",
  type: "page-type/file-property",
  slug: "icon-drawing",
  propertySlug: "icon-drawing",
  definition: "the drawing making an app's icon",
  extensions: ["svg"],
  types: "ts",
} as const satisfies FileProperty
