import type { LocationCollection } from "akasha/alan/collection/place/location-collection/location-collection.page-type.types.ts"

export const myPlaces = {
  id: "019f1590-46da-7b16-a9ef-e8e25c2f7712",
  type: "page-type/location-collection",
  slug: "my-places",
  title: "My Places",
  locationCollectionDescription: "txt",
  icon: "file-text",
  createdAt: "2026-06-29T22:46:44.698Z",
  updatedAt: "2026-09-15T17:22:48.000Z",
} as const satisfies LocationCollection
