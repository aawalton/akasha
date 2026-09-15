import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const freeStuffGetoutGamesFreeAdmitForOnePerson = {
  id: "019f322c-a086-7f5a-a78b-1a4b56f78ead",
  type: "page-type/location-deal",
  slug: "free-stuff-getout-games-free-admit-for-one-person",
  title: "GetOut Games — FREE! Admit for ONE Person!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:getout-games:free-admit-for-one-person",
  finePrint: "M-Th only!",
  locations: ["location/getout-games-utah-county"],
  offerText: "FREE! Admit for ONE Person!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "3",
  usesUsed: 0,
} as const satisfies LocationDeal
