import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const planetOfTheApes2001 = {
  id: "01a06802-6d99-702c-b4f6-e4e016e08ae7",
  type: "page-type/movie",
  slug: "planet-of-the-apes-2001",
  title: "Planet of the Apes (2001)",
  partOfCollections: ["fandom/planet-of-the-apes-2"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2001-07-27",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/planet-of-the-apes-2001",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
