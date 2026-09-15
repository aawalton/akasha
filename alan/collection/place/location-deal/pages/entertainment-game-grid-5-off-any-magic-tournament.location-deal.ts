import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const entertainmentGameGrid5OffAnyMagicTournament = {
  id: "019f322c-9d5c-7512-bea5-069115c2e976",
  type: "page-type/location-deal",
  slug: "entertainment-game-grid-5-off-any-magic-tournament",
  title: "Game Grid — $5 OFF! Any Magic Tournament!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:entertainment:game-grid:5-off-any-magic-tournament",
  finePrint: "Lehi",
  locations: ["location/game-grid-lehi"],
  offerText: "$5 OFF! Any Magic Tournament!",
  offerType: "dollar-off",
  section: "Entertainment",
  struckOut: false,
  useLimit: "3",
  usesUsed: 0,
} as const satisfies LocationDeal
