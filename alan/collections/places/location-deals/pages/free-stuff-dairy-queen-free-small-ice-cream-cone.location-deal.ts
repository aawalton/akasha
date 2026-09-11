import type { LocationDeal } from "akasha/alan/collections/places/location-deals/location-deal.page-type.types.ts"

export const freeStuffDairyQueenFreeSmallIceCreamCone = {
  id: "019f322c-a01f-7307-93fc-fc6f83863ef1",
  type: "location-deal",
  slug: "free-stuff-dairy-queen-free-small-ice-cream-cone",
  title: "Dairy Queen — FREE! Small Ice Cream Cone!",
  collection: "starving-student-card",
  dealKey: "ssc:free-stuff:dairy-queen:free-small-ice-cream-cone",
  finePrint: "Orem, Vineyard, EM & Santaquin",
  locations: [
    "dairy-queen-eagle-mountain",
    "dairy-queen-orem",
    "dairy-queen-santaquin",
    "dairy-queen-vineyard",
  ],
  offerText: "FREE! Small Ice Cream Cone!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
