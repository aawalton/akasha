import type { locationCollectionDescription } from "akasha/places/location-collections/properties/location-collection-description.file-property.ts"

export type LocationCollectionDescription =
  (typeof locationCollectionDescription.extensions)[number]
