import type { FileProperty } from "@akasha/pages-system/file-property"

export type LocationCollectionDescription = "txt"

export const locationCollectionDescription = {
  id: "01a06583-a7d5-7499-90ec-b24b1a3ca0a8",
  pageTypeSlug: "file-property",
  slug: "location-collection-description",
  propertySlug: "location-collection-description",
  definition: "what a gathering of places is and where it came from",
} as const satisfies FileProperty
