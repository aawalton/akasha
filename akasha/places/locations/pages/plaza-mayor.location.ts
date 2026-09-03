import type { Location } from "../location.page-type.ts"

export const plazaMayor = {
  id: "019f1aec-0d6f-7175-9445-ddb7efb463e0",
  pageTypeSlug: "location",
  slug: "plaza-mayor",
  title: "Plaza Mayor",
  latitude: 40.4153949,
  longitude: -3.7069974,
  notes: "Incredible Plaza. Shops on bottom, housing on top",
  sourcePlaceId: "gmaps:0xd202c4f0d67625e8",
  sourceUrl:
    "https://www.google.com/maps/place/Plaza+Mayor/data=!4m2!3m1!1s0xd42287ed85fe0d9:0xd202c4f0d67625e8",
  locationSource: "saved:Madrid, Spain",
} as const satisfies Location
