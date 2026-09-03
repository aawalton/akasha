import type { Location } from "../location.page-type.ts"

export const alhambra = {
  id: "019f1aec-0d75-76e5-a91a-33ab7a523d1a",
  pageTypeSlug: "location",
  slug: "alhambra",
  title: "Alhambra",
  latitude: 40.4018448,
  longitude: -3.7449496,
  notes: "Ferdinand and Isabella‘s castle. Believed to be where Christopher Columbus met with them",
  sourcePlaceId: "gmaps:0x808dd1ef1221a27f",
  sourceUrl:
    "https://www.google.com/maps/place/Alhambra/data=!4m2!3m1!1s0xd71fcb7977fb93b:0x808dd1ef1221a27f",
  locationSource: "saved:Madrid, Spain",
} as const satisfies Location
