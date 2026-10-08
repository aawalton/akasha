import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const entertainmentStadiumCinemas241MovieTicket = {
  id: "019f322c-9edb-7f50-80e2-7581bba62087",
  type: "page-type/location-deal",
  slug: "entertainment-stadium-cinemas-2-4-1-movie-ticket",
  title: "Stadium Cinemas — 2-4-1 Movie Ticket!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:entertainment:stadium-cinemas:2-4-1-movie-ticket",
  locations: ["location/stadium-cinemas-utah-county"],
  offerText: "2-4-1 Movie Ticket!",
  offerType: "2-4-1",
  section: "Entertainment",
  struckOut: false,
  useLimit: "3",
  usesUsed: 0,
  createdAt: "2026-07-05T12:06:52.891Z",
  updatedAt: "2026-09-15T17:23:10.000Z",
} as const satisfies LocationDeal
