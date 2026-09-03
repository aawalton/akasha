import type { Location } from "../location.page-type.ts"

export const casaPiriquita = {
  id: "019f1aec-0eb8-7c6a-9bad-5fe330d38d1e",
  pageTypeSlug: "location",
  slug: "casa-piriquita",
  title: "Casa Piriquita",
  latitude: 38.796708,
  longitude: -9.390525,
  notes:
    "Travesseiros invented here. \n\nThey were good, but they weren’t served hot. \n\nThey did have extra options",
  sourcePlaceId: "gmaps:0xaa1c7d54bf379de2",
  sourceUrl:
    "https://www.google.com/maps/place/Casa+Piriquita/data=!4m2!3m1!1s0xd1edac0197b469b:0xaa1c7d54bf379de2",
  locationSource: "saved:Lisbon, Portugal",
} as const satisfies Location
