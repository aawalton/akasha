import type { Location } from "../location.page-type.ts"

export const bastei = {
  id: "019f1aec-0d4b-7592-8afc-5f81ff53ef7e",
  pageTypeSlug: "location",
  slug: "bastei",
  title: "Bastei",
  latitude: 52.5985385,
  longitude: 13.3908733,
  sourcePlaceId: "gmaps:0x1d39e434742c2d6c",
  sourceUrl:
    "https://www.google.com/maps/place/Bastei/data=!4m2!3m1!1s0x4709bad6f1ef2ee7:0x1d39e434742c2d6c",
  locationSource: "saved:Berlin, Germany",
} as const satisfies Location
