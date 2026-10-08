import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const freeStuffDairyQueenFreeSmallIceCreamCone = {
  id: "019f322c-a01f-7307-93fc-fc6f83863ef1",
  type: "page-type/location-deal",
  slug: "free-stuff-dairy-queen-free-small-ice-cream-cone",
  title: "Dairy Queen — FREE! Small Ice Cream Cone!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:dairy-queen:free-small-ice-cream-cone",
  finePrint: "Orem, Vineyard, EM & Santaquin",
  locations: [
    "location/dairy-queen-eagle-mountain",
    "location/dairy-queen-orem",
    "location/dairy-queen-santaquin",
    "location/dairy-queen-vineyard",
  ],
  offerText: "FREE! Small Ice Cream Cone!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
  createdAt: "2026-07-05T12:06:53.215Z",
  updatedAt: "2026-09-15T17:23:10.000Z",
} as const satisfies LocationDeal
