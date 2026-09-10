import type { Page } from "../../pages/page.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Address } from "./properties/address.text-property.ts"
import type { Collection } from "./properties/collection.relation-property.ts"
import type { CuisineOrType } from "./properties/cuisine-or-type.text-property.ts"
import type { Latitude } from "./properties/latitude.number-property.ts"
import type { LocationCategory } from "./properties/location-category.text-property.ts"
import type { LocationNotes } from "./properties/location-notes.text-property.ts"
import type { LocationSource } from "./properties/location-source.text-property.ts"
import type { Longitude } from "./properties/longitude.number-property.ts"
import type { ReviewDate } from "./properties/review-date.calendar-date-property.ts"
import type { ReviewFlag } from "./properties/review-flag.text-property.ts"
import type { ReviewRating } from "./properties/review-rating.number-property.ts"
import type { ReviewText } from "./properties/review-text.text-property.ts"
import type { ScheduledEndAt } from "./properties/scheduled-end-at.instant-property.ts"
import type { ScheduledStartAt } from "./properties/scheduled-start-at.instant-property.ts"
import type { SourcePlaceId } from "./properties/source-place-id.text-property.ts"
import type { SourceUrl } from "./properties/source-url.url-property.ts"
import type { Visited } from "./properties/visited.boolean-property.ts"

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
