import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const entertainmentTheRuth50OffSameDayTicket = {
  id: "019f322c-9ef3-7d84-8dc4-f2ae16772dbe",
  type: "page-type/location-deal",
  slug: "entertainment-the-ruth-50-off-same-day-ticket",
  title: "The Ruth — 50% OFF! Same Day Ticket!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:entertainment:the-ruth:50-off-same-day-ticket",
  finePrint: "Present Card in Person",
  locations: ["location/the-ruth-utah-county"],
  offerText: "50% OFF! Same Day Ticket!",
  offerType: "percent-off",
  section: "Entertainment",
  struckOut: false,
  useLimit: "3",
  usesUsed: 0,
} as const satisfies LocationDeal
