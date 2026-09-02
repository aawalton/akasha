import type { FileProperty } from "@akasha/pages-system/file-property"

export type SiblingManifest = "json"

export const siblingManifest = {
  id: "01a06237-19b4-7a06-aefd-0f827dda1054",
  pageTypeSlug: "file-property",
  slug: "sibling-manifest",
  propertySlug: "sibling-manifest",
  definition: "what a second addon shipped inside this one states about itself",
} as const satisfies FileProperty
