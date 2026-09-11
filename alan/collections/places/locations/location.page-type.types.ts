import type { Address } from "akasha/alan/collections/places/locations/properties/address.text-property.types.ts"
import type { Collection } from "akasha/alan/collections/places/locations/properties/collection.relation-property.types.ts"
import type { CuisineOrType } from "akasha/alan/collections/places/locations/properties/cuisine-or-type.text-property.types.ts"
import type { Latitude } from "akasha/alan/collections/places/locations/properties/latitude.number-property.types.ts"
import type { LocationCategory } from "akasha/alan/collections/places/locations/properties/location-category.text-property.types.ts"
import type { LocationNotes } from "akasha/alan/collections/places/locations/properties/location-notes.text-property.types.ts"
import type { LocationSource } from "akasha/alan/collections/places/locations/properties/location-source.text-property.types.ts"
import type { Longitude } from "akasha/alan/collections/places/locations/properties/longitude.number-property.types.ts"
import type { ReviewDate } from "akasha/alan/collections/places/locations/properties/review-date.calendar-date-property.types.ts"
import type { ReviewFlag } from "akasha/alan/collections/places/locations/properties/review-flag.text-property.types.ts"
import type { ReviewRating } from "akasha/alan/collections/places/locations/properties/review-rating.number-property.types.ts"
import type { ReviewText } from "akasha/alan/collections/places/locations/properties/review-text.text-property.types.ts"
import type { ScheduledEndAt } from "akasha/alan/collections/places/locations/properties/scheduled-end-at.instant-property.types.ts"
import type { ScheduledStartAt } from "akasha/alan/collections/places/locations/properties/scheduled-start-at.instant-property.types.ts"
import type { SourcePlaceId } from "akasha/alan/collections/places/locations/properties/source-place-id.text-property.types.ts"
import type { SourceUrl } from "akasha/alan/collections/places/locations/properties/source-url.url-property.types.ts"
import type { Visited } from "akasha/alan/collections/places/locations/properties/visited.boolean-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type Location = Page & {
  title: Title
  address?: Address
  locationCategory?: LocationCategory
  collection?: Collection
  cuisineOrType?: CuisineOrType
  latitude?: Latitude
  longitude?: Longitude
  notes?: LocationNotes
  reviewDate?: ReviewDate
  reviewFlag?: ReviewFlag
  reviewRating?: ReviewRating
  reviewText?: ReviewText
  scheduledEndAt?: ScheduledEndAt
  scheduledStartAt?: ScheduledStartAt
  sourcePlaceId?: SourcePlaceId
  sourceUrl?: SourceUrl
  locationSource?: LocationSource
  visited?: Visited
}
