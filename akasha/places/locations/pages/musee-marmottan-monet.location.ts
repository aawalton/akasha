import type { Location } from "../location.page-type.ts"

export const museeMarmottanMonet = {
  id: "019f1aec-0dc6-77bf-8162-36016a2c8412",
  pageTypeSlug: "location",
  slug: "musee-marmottan-monet",
  title: "Musée Marmottan Monet",
  latitude: 48.8594112,
  longitude: 2.2672558,
  notes: "Largest collection of Monet paintings",
  sourcePlaceId: "gmaps:0x4ec7611155da854c",
  sourceUrl:
    "https://www.google.com/maps/place/Mus%C3%A9e+Marmottan+Monet/data=!4m2!3m1!1s0x47e665529447f461:0x4ec7611155da854c",
  locationSource: "saved:Paris, France",
} as const satisfies Location
