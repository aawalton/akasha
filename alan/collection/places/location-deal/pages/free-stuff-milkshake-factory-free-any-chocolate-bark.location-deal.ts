import type { LocationDeal } from "akasha/alan/collection/places/location-deal/location-deal.page-type.types.ts"

export const freeStuffMilkshakeFactoryFreeAnyChocolateBark = {
  id: "019f322c-a147-7194-9e88-000fbe225af2",
  type: "location-deal",
  slug: "free-stuff-milkshake-factory-free-any-chocolate-bark",
  title: "MilkShake Factory — FREE! Any Chocolate Bark!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:milkshake-factory:free-any-chocolate-bark",
  finePrint: "All UT Locations",
  locations: ["location/milkshake-factory-utah-county"],
  offerText: "FREE! Any Chocolate Bark!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
