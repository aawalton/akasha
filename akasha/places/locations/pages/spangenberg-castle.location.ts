import type { Location } from "../location.page-type.ts"

export const spangenbergCastle = {
  id: "019f1aec-0ef3-7ab4-a026-cf4458d9d19b",
  pageTypeSlug: "location",
  slug: "spangenberg-castle",
  title: "Spangenberg Castle",
  latitude: 51.119484,
  longitude: 9.6619908,
  notes: "Dreamy castle, you can stay at",
  sourcePlaceId: "gmaps:0xee69949fb0913ee7",
  sourceUrl:
    "https://www.google.com/maps/place/Spangenberg+Castle/data=!4m2!3m1!1s0x47bb4df909e108f5:0xee69949fb0913ee7",
  locationSource: "saved:Germany",
} as const satisfies Location
