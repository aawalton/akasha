import type { Location } from "../location.page-type.ts"

export const blindRabbitKitchen = {
  id: "019f1b49-54b4-74aa-bef6-bbc53f82ca99",
  pageTypeSlug: "location",
  slug: "blind-rabbit-kitchen",
  title: "Blind Rabbit Kitchen",
  latitude: 40.725016,
  longitude: -111.860222,
  notes: "Foodie fellowship. Like Sol Agave, but American.",
  sourcePlaceId: "gmaps:0x33a8f458ad59e211",
  sourceUrl:
    "https://www.google.com/maps/place/Blind+Rabbit+Kitchen/data=!4m2!3m1!1s0x87528bbc07fdb839:0x33a8f458ad59e211",
  locationSource: "saved:UT, SLC",
} as const satisfies Location
