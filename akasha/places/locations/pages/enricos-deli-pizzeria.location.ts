import type { Location } from "../location.page-type.ts"

export const enricosDeliPizzeria = {
  id: "019f1b49-5140-7ecc-90c1-d7a32407dbc2",
  pageTypeSlug: "location",
  slug: "enricos-deli-pizzeria",
  title: "Enrico's Deli & Pizzeria",
  latitude: 40.6505509,
  longitude: -73.8382013,
  notes: "So on Instagram. I want to try the Stromboli.",
  sourcePlaceId: "gmaps:0x728914d7fcb29e45",
  sourceUrl:
    "https://www.google.com/maps/place/Enrico's+Deli+%26+Pizzeria/data=!4m2!3m1!1s0x8752890063ce5875:0x728914d7fcb29e45",
  locationSource: "saved:Want to go",
} as const satisfies Location
