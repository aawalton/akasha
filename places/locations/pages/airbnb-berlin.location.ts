import type { Location } from "../location.page-type.ts"

export const airbnbBerlin = {
  id: "019f1aec-0f51-7799-8a7c-2ef5e42eeeac",
  pageTypeSlug: "location",
  slug: "airbnb-berlin",
  title: "Airbnb Berlin",
  address: "Klopstockstraße 2, 10557 Berlin, Germany",
  latitude: 52.514854299999996,
  longitude: 13.3389715,
  sourcePlaceId: "takeout:airbnb-berlin:klopstockstra-e-2-10557-berlin-germany",
  locationSource: "labeled",
} as const satisfies Location
