import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../temper/temper-things/properties/title.text-property.ts"
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
import type { ScheduledEnd } from "./properties/scheduled-end.instant-property.ts"
import type { ScheduledStart } from "./properties/scheduled-start.instant-property.ts"
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
  scheduledEnd?: ScheduledEnd
  scheduledStart?: ScheduledStart
  sourcePlaceId?: SourcePlaceId
  sourceUrl?: SourceUrl
  locationSource?: LocationSource
  visited?: Visited
}

export const location = {
  id: "01a06583-acfb-78cd-80a3-4b5b464dc8ff",
  pageTypeSlug: "page-type",
  slug: "location",
  definition: "a place on the map somebody kept",
  pluralSlug: "locations",
  extendsSlug: "page-type/page",
  partSlugs: [
    "boolean-property/visited",
    "calendar-date-property/review-date",
    "instant-property/scheduled-end",
    "instant-property/scheduled-start",
    "number-property/latitude",
    "number-property/longitude",
    "number-property/review-rating",
    "relation-property/collection",
    "text-property/address",
    "text-property/cuisine-or-type",
    "text-property/location-category",
    "text-property/location-notes",
    "text-property/location-source",
    "text-property/review-flag",
    "text-property/review-text",
    "text-property/source-place-id",
    "url-property/source-url",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "address", required: false, many: false },
    { pagePropertySlug: "location-category", required: false, many: false },
    { pagePropertySlug: "collection", required: false, many: false },
    { pagePropertySlug: "cuisine-or-type", required: false, many: false },
    { pagePropertySlug: "latitude", required: false, many: false },
    { pagePropertySlug: "longitude", required: false, many: false },
    { pagePropertySlug: "location-notes", required: false, many: false },
    { pagePropertySlug: "review-date", required: false, many: false },
    { pagePropertySlug: "review-flag", required: false, many: false },
    { pagePropertySlug: "review-rating", required: false, many: false },
    { pagePropertySlug: "review-text", required: false, many: false },
    { pagePropertySlug: "scheduled-end", required: false, many: false },
    { pagePropertySlug: "scheduled-start", required: false, many: false },
    { pagePropertySlug: "source-place-id", required: false, many: false },
    { pagePropertySlug: "source-url", required: false, many: false },
    { pagePropertySlug: "location-source", required: false, many: false },
    { pagePropertySlug: "visited", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Where a place came from is what its source says rather than what page type it is.",
    },
    {
      invariantKind: "departure",
      statement: "A place kept from a map export carries the place id that export gave it.",
    },
    {
      invariantKind: "departure",
      statement: "A place standing on an itinerary carries the hours it is scheduled between.",
    },
  ],
} as const satisfies PageType
