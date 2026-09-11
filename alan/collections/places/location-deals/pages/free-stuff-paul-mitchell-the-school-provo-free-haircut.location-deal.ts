import type { LocationDeal } from "akasha/alan/collections/places/location-deals/location-deal.page-type.types.ts"

export const freeStuffPaulMitchellTheSchoolProvoFreeHaircut = {
  id: "019f322c-a1f0-7ac4-99e9-4dbace706ae3",
  type: "location-deal",
  slug: "free-stuff-paul-mitchell-the-school-provo-free-haircut",
  title: "Paul Mitchell the School Provo — FREE! Haircut!",
  collection: "starving-student-card",
  dealKey: "ssc:free-stuff:paul-mitchell-the-school-provo:free-haircut",
  locations: ["paul-mitchell-the-school-provo-utah-county"],
  offerText: "FREE! Haircut!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 1,
} as const satisfies LocationDeal
