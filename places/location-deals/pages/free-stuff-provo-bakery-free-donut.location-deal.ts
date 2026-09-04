import type { LocationDeal } from "../location-deal.page-type.ts"

export const freeStuffProvoBakeryFreeDonut = {
  id: "019f322c-a25e-7e5f-8eba-f603482611ff",
  pageTypeSlug: "location-deal",
  slug: "free-stuff-provo-bakery-free-donut",
  title: "Provo Bakery — FREE! Donut!",
  collection: "starving-student-card",
  dealKey: "ssc:free-stuff:provo-bakery:free-donut",
  locations: ["provo-bakery-utah-county"],
  offerText: "FREE! Donut!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
