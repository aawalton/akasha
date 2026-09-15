import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const freeStuffLaserAssaultFreeGameOfLaserTag = {
  id: "019f322c-a098-75dc-95e4-3a22412417b4",
  type: "page-type/location-deal",
  slug: "free-stuff-laser-assault-free-game-of-laser-tag",
  title: "Laser Assault — FREE! Game of Laser Tag!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:laser-assault:free-game-of-laser-tag",
  locations: ["location/laser-assault-utah-county"],
  offerText: "FREE! Game of Laser Tag!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
