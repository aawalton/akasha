import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const riseOfThePlanetOfTheApes = {
  id: "01a06802-6d99-702f-9406-d0f726fb8492",
  type: "page-type/movie",
  slug: "rise-of-the-planet-of-the-apes",
  title: "Rise of the Planet of the Apes",
  partOfCollections: ["fandom/planet-of-the-apes-2"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2011-08-05",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/rise-of-the-planet-of-the-apes-2011",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
