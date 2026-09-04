import type { Location } from "../location.page-type.ts"

export const elBarrilBreakfastLunch = {
  id: "019f1b49-5249-7e03-af65-0659b9f9af1c",
  pageTypeSlug: "location",
  slug: "el-barril-breakfast-lunch",
  title: "El Barril Breakfast & Lunch",
  latitude: 42.5898104,
  longitude: -6.6917786,
  notes: "Apparently a great brunch. I’m curious about the French toast.",
  sourcePlaceId: "gmaps:0x23d9ef21db735c9b",
  sourceUrl:
    "https://www.google.com/maps/place/El+Barril+Breakfast+%26+Lunch/data=!4m2!3m1!1s0x8752879dd5b9e5f9:0x23d9ef21db735c9b",
  locationSource: "saved:Want to go",
} as const satisfies Location
