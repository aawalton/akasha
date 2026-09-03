import type { LocationDeal } from "../location-deal.page-type.ts"

export const freeStuffCulversFreeScoopOfFrozenCustard = {
  id: "019f322c-a014-7993-ae2d-fb1c47419533",
  pageTypeSlug: "location-deal",
  slug: "free-stuff-culvers-free-scoop-of-frozen-custard",
  title: "Culver's — FREE! Scoop of Frozen Custard!",
  collection: "starving-student-card",
  dealKey: "ssc:free-stuff:culvers:free-scoop-of-frozen-custard",
  finePrint: "Northern UT Locations",
  locations: ["culvers-utah-county"],
  offerText: "FREE! Scoop of Frozen Custard!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 1,
} as const satisfies LocationDeal
