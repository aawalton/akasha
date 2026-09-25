import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const dawnOfThePlanetOfTheApes = {
  id: "01a06802-6d99-7001-bf2b-32cd264b31b4",
  type: "page-type/movie",
  slug: "dawn-of-the-planet-of-the-apes",
  title: "Dawn of the Planet of the Apes",
  partOfCollections: ["fandom/planet-of-the-apes-2"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2014-07-11",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/dawn-of-the-planet-of-the-apes-2014",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
