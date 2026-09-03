import type { Location } from "../location.page-type.ts"

export const colosseum = {
  id: "019f1aec-0daf-7108-9050-4eb67de3ed7d",
  pageTypeSlug: "location",
  slug: "colosseum",
  title: "Colosseum",
  latitude: 41.8909421,
  longitude: 12.491903,
  sourcePlaceId: "gmaps:0x28f1c82e908503c4",
  sourceUrl:
    "https://www.google.com/maps/place/Colosseum/data=!4m2!3m1!1s0x132f61b6532013ad:0x28f1c82e908503c4",
  locationSource: "saved:Rome, Italy",
} as const satisfies Location
