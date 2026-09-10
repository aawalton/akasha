import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type LocationCollectionDescription = "txt"

export const locationCollectionDescription = {
  id: "01a06589-d12e-7ac4-8ef8-cba8fb8d1b01",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "location-collection-description",
  propertySlug: "location-collection-description",
  definition: "what a gathering of places is and where it came from",
} as const satisfies FileProperty
