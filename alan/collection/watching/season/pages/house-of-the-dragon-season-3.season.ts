import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const houseOfTheDragonSeason3 = {
  id: "01a18849-a938-7174-9e6f-bae8a1318a8d",
  type: "page-type/season",
  slug: "house-of-the-dragon-season-3",
  description:
    "The Black and Green factions lock into an all-out, relentless struggle for the Iron Throne. As dragons and armies clash across the realm, Westeros witnesses the devastating consequences of total war.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/house-of-the-dragon"],
  position: 3,
  publishedAt: "2026-06-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "449260",
      externalLink: "https://www.themoviedb.org/tv/94997/season/3",
    },
  ],
  title: "House of the Dragon Season 3",
  posterPath: "/wSvDQN6tZR4VzDDZD3MUPIghVjC.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:31:31.254Z",
  updatedAt: "2026-10-29T15:31:31.254Z",
} as const satisfies Season
