import type { Location } from "../location.page-type.ts"

export const airbnb = {
  id: "019f1aec-0f2f-77e3-b72c-98c922d0aa2f",
  pageTypeSlug: "location",
  slug: "airbnb",
  title: "Airbnb",
  address: "4442 41st St, San Diego, CA 92116, USA",
  latitude: 32.7579719,
  longitude: -117.10740009999999,
  sourcePlaceId: "takeout:airbnb:4442-41st-st-san-diego-ca-92116-usa",
  locationSource: "labeled",
} as const satisfies Location
