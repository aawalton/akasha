import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const freeStuffCoinCrazyFreeIceCreamCone = {
  id: "019f322c-a004-7709-8aa0-6ea7081f70ba",
  type: "page-type/location-deal",
  slug: "free-stuff-coin-crazy-free-ice-cream-cone",
  title: "Coin Crazy — FREE! Ice Cream Cone!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:coin-crazy:free-ice-cream-cone",
  locations: ["location/coin-crazy-utah-county"],
  offerText: "FREE! Ice Cream Cone!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
  createdAt: "2026-07-05T12:06:53.188Z",
  updatedAt: "2026-09-15T17:23:10.000Z",
} as const satisfies LocationDeal
