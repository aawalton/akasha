import type { LocationDeal } from "../location-deal.page-type.ts"

export const sandwichesAndBurgersWendysFreeSmallFrostyWAnyPurchase = {
  id: "019f322c-b06f-717d-926a-6b6d96ccaa03",
  pageTypeSlug: "location-deal",
  slug: "sandwiches-and-burgers-wendys-free-small-frosty-w-any-purchase",
  title: "Wendy's — FREE! Small Frosty w/ Any Purchase!",
  collection: "starving-student-card",
  dealKey: "ssc:sandwiches-and-burgers:wendys:free-small-frosty-w-any-purchase",
  finePrint:
    "Provo 122 E 1200 N, Orem Center St, N. Orem, AF, Highland, Saratoga, Traverse Mtn & Participating Locations",
  locations: [
    "wendys-american-fork",
    "wendys-highland",
    "wendys-lehi",
    "wendys-orem",
    "wendys-provo",
    "wendys-saratoga-springs",
  ],
  offerText: "FREE! Small Frosty w/ Any Purchase!",
  offerType: "free",
  section: "Sandwiches & Burgers",
  struckOut: false,
  useLimit: "no-limit",
  usesUsed: 0,
} as const satisfies LocationDeal
