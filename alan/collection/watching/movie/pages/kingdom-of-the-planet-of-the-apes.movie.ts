import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const kingdomOfThePlanetOfTheApes = {
  id: "01a06802-6d99-7022-892b-386d304b91a6",
  type: "page-type/movie",
  slug: "kingdom-of-the-planet-of-the-apes",
  title: "Kingdom of the Planet of the Apes",
  partOfCollections: ["fandom/planet-of-the-apes-2"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-05-10",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/kingdom-of-the-planet-of-the-apes-2024",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
