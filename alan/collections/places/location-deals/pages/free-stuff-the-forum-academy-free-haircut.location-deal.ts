import type { LocationDeal } from "akasha/alan/collections/places/location-deals/location-deal.page-type.types.ts"

export const freeStuffTheForumAcademyFreeHaircut = {
  id: "019f322c-a342-7ce9-90c0-8b95cebe1833",
  type: "location-deal",
  slug: "free-stuff-the-forum-academy-free-haircut",
  title: "The Forum Academy — FREE! Haircut!",
  collection: "starving-student-card",
  dealKey: "ssc:free-stuff:the-forum-academy:free-haircut",
  locations: ["the-forum-academy-utah-county"],
  offerText: "FREE! Haircut!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "2",
  usesUsed: 0,
} as const satisfies LocationDeal
