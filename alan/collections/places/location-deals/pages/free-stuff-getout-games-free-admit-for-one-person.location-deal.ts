import type { LocationDeal } from "akasha/alan/collections/places/location-deals/location-deal.page-type.types.ts"

export const freeStuffGetoutGamesFreeAdmitForOnePerson = {
  id: "019f322c-a086-7f5a-a78b-1a4b56f78ead",
  type: "location-deal",
  slug: "free-stuff-getout-games-free-admit-for-one-person",
  title: "GetOut Games — FREE! Admit for ONE Person!",
  collection: "starving-student-card",
  dealKey: "ssc:free-stuff:getout-games:free-admit-for-one-person",
  finePrint: "M-Th only!",
  locations: ["getout-games-utah-county"],
  offerText: "FREE! Admit for ONE Person!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "3",
  usesUsed: 0,
} as const satisfies LocationDeal
