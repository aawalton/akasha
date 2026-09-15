import type { LocationDeal } from "akasha/alan/collection/places/location-deal/location-deal.page-type.types.ts"

export const freeStuffByuOutdoorsUnlimitedFreeSkiOrSnowboardRental = {
  id: "019f322c-9f97-745a-a771-ba26e418f0eb",
  type: "location-deal",
  slug: "free-stuff-byu-outdoors-unlimited-free-ski-or-snowboard-rental",
  title: "BYU Outdoors Unlimited — FREE! Ski or Snowboard Rental!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:byu-outdoors-unlimited:free-ski-or-snowboard-rental",
  finePrint: "M-Th",
  locations: ["location/byu-outdoors-unlimited-utah-county"],
  offerText: "FREE! Ski or Snowboard Rental!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
