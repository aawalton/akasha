import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const planetOfTheApes = {
  id: "01a06802-6d99-702b-b525-13f353948585",
  type: "page-type/movie",
  slug: "planet-of-the-apes",
  title: "Planet of the Apes",
  partOfCollections: ["fandom/planet-of-the-apes-2"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1968-02-07",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/planet-of-the-apes-1968",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
