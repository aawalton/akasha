import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const conquestOfThePlanetOfTheApes = {
  id: "01a06802-6d99-7000-915a-48750bb813d6",
  type: "page-type/movie",
  slug: "conquest-of-the-planet-of-the-apes",
  title: "Conquest of the Planet of the Apes",
  partOfCollections: ["fandom/planet-of-the-apes-2"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1972-06-29",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/conquest-of-the-planet-of-the-apes-1972",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
