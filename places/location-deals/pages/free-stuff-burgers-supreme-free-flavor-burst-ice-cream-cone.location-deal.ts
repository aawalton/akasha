import type { LocationDeal } from "../location-deal.page-type.ts"

export const freeStuffBurgersSupremeFreeFlavorBurstIceCreamCone = {
  id: "019f322c-9f6e-7a01-badd-915e96355891",
  pageTypeSlug: "location-deal",
  slug: "free-stuff-burgers-supreme-free-flavor-burst-ice-cream-cone",
  title: "Burgers Supreme — FREE! Flavor Burst Ice Cream Cone!",
  collection: "starving-student-card",
  dealKey: "ssc:free-stuff:burgers-supreme:free-flavor-burst-ice-cream-cone",
  locations: ["burgers-supreme-utah-county"],
  offerText: "FREE! Flavor Burst Ice Cream Cone!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 1,
} as const satisfies LocationDeal
