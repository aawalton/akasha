import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const freeStuffStadiumCinemasFreeMovieTicket = {
  id: "019f322c-a31f-720e-8e5d-990f4b319e16",
  type: "page-type/location-deal",
  slug: "free-stuff-stadium-cinemas-free-movie-ticket",
  title: "Stadium Cinemas — FREE! Movie Ticket!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:stadium-cinemas:free-movie-ticket",
  locations: ["location/stadium-cinemas-utah-county"],
  offerText: "FREE! Movie Ticket!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
  createdAt: "2026-07-05T12:06:53.983Z",
  updatedAt: "2026-09-15T17:23:10.000Z",
} as const satisfies LocationDeal
