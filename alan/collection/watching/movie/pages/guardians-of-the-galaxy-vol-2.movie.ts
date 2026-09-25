import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const guardiansOfTheGalaxyVol2 = {
  id: "01a06802-6d99-7013-8c4d-9148018e7c09",
  type: "page-type/movie",
  slug: "guardians-of-the-galaxy-vol-2",
  title: "Guardians of the Galaxy Vol. 2",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 15,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-05-05",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/guardians-of-the-galaxy-vol-2-2017",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
