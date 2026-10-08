import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const freeStuffElPolloLocoFreeLocoValueMenuItem = {
  id: "019f322c-a06d-7c9e-98ca-cb673c6ffdc0",
  type: "page-type/location-deal",
  slug: "free-stuff-el-pollo-loco-free-loco-value-menu-item",
  title: "El Pollo Loco — FREE! Loco Value Menu Item!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:el-pollo-loco:free-loco-value-menu-item",
  finePrint: "Orem, Lehi & Particip. Locations",
  locations: ["location/el-pollo-loco-lehi", "location/el-pollo-loco-orem"],
  offerText: "FREE! Loco Value Menu Item!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
  createdAt: "2026-07-05T12:06:53.293Z",
  updatedAt: "2026-09-15T17:23:10.000Z",
} as const satisfies LocationDeal
