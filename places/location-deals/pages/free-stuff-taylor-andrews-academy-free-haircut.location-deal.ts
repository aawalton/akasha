import type { LocationDeal } from "../location-deal.page-type.ts"

export const freeStuffTaylorAndrewsAcademyFreeHaircut = {
  id: "019f322c-a33c-7d23-b3ee-c9aaa37644eb",
  pageTypeSlug: "location-deal",
  slug: "free-stuff-taylor-andrews-academy-free-haircut",
  title: "Taylor Andrews Academy — FREE! Haircut!",
  collection: "starving-student-card",
  dealKey: "ssc:free-stuff:taylor-andrews-academy:free-haircut",
  finePrint: "M-Th Provo and WJ",
  locations: ["taylor-andrews-academy-provo", "taylor-andrews-academy-west-jordan"],
  offerText: "FREE! Haircut!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
