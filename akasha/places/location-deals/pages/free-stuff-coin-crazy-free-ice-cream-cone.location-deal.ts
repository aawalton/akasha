import type { LocationDeal } from "../location-deal.page-type.ts"

export const freeStuffCoinCrazyFreeIceCreamCone = {
  id: "019f322c-a004-7709-8aa0-6ea7081f70ba",
  pageTypeSlug: "location-deal",
  slug: "free-stuff-coin-crazy-free-ice-cream-cone",
  title: "Coin Crazy — FREE! Ice Cream Cone!",
  collection: "starving-student-card",
  dealKey: "ssc:free-stuff:coin-crazy:free-ice-cream-cone",
  locations: ["coin-crazy-utah-county"],
  offerText: "FREE! Ice Cream Cone!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
