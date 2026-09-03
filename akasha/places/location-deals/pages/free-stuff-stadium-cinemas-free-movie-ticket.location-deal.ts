import type { LocationDeal } from "../location-deal.page-type.ts"

export const freeStuffStadiumCinemasFreeMovieTicket = {
  id: "019f322c-a31f-720e-8e5d-990f4b319e16",
  pageTypeSlug: "location-deal",
  slug: "free-stuff-stadium-cinemas-free-movie-ticket",
  title: "Stadium Cinemas — FREE! Movie Ticket!",
  collection: "starving-student-card",
  dealKey: "ssc:free-stuff:stadium-cinemas:free-movie-ticket",
  locations: ["stadium-cinemas-utah-county"],
  offerText: "FREE! Movie Ticket!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
