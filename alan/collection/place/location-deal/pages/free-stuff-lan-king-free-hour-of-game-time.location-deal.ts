import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const freeStuffLanKingFreeHourOfGameTime = {
  id: "019f322c-a096-713b-b644-e94bfdcf9066",
  type: "page-type/location-deal",
  slug: "free-stuff-lan-king-free-hour-of-game-time",
  title: "LAN King — FREE! Hour of Game Time!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:lan-king:free-hour-of-game-time",
  locations: ["location/lan-king-utah-county"],
  offerText: "FREE! Hour of Game Time!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
  createdAt: "2026-07-05T12:06:53.334Z",
  updatedAt: "2026-09-15T17:23:10.000Z",
} as const satisfies LocationDeal
