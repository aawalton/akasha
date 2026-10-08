import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const place = {
  id: "01a06590-0000-7000-8000-000000000201",
  type: "page-type/domain",
  slug: "place",
  definition: "where a person can go",
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
  createdAt: "2026-09-03T04:38:51.136Z",
  updatedAt: "2026-09-24T18:05:19.000Z",
} as const satisfies Domain
