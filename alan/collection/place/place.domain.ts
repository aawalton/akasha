import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const place = {
  id: "01a06590-0000-7000-8000-000000000201",
  type: "page-type/domain",
  slug: "place",
  definition: "the places somebody kept on the map and what is redeemable at them",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "place" },
    { partOfSpeech: "part-of-speech/noun", spelling: "places" },
  ],
  parts: [
    "page-type/location",
    "page-type/location-collection",
    "page-type/location-deal",
    "page-type/restaurant",
    "page-type/restaurant-collection",
    "page-type/restaurant-menu-item",
    "page-type/travel-collection",
  ],
} as const satisfies Domain
