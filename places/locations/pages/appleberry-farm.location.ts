import type { Location } from "../location.page-type.ts"

export const appleberryFarm = {
  id: "019f1aec-0f1e-77d9-8ce2-bd828fe65933",
  pageTypeSlug: "location",
  slug: "appleberry-farm",
  title: "Appleberry Farm",
  latitude: 43.041044,
  longitude: -89.6137188,
  notes:
    "I think this was the first place I took my kids to do a fall hay ride. I remember Lizzy eating a fresh golden delicious apple and I was so excited because she was picky and just learning to eat real foods.",
  sourcePlaceId: "gmaps:0x6abcb36dd4c3120d",
  sourceUrl:
    "https://www.google.com/maps/place/Appleberry+Farm/data=!4m2!3m1!1s0x8807a497406d5feb:0x6abcb36dd4c3120d",
  locationSource: "saved:WI",
} as const satisfies Location
