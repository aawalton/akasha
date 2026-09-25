import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const suicideSquad = {
  id: "01a06802-6d9a-7003-8870-7397f7db6e97",
  type: "page-type/movie",
  slug: "suicide-squad",
  title: "Suicide Squad",
  partOfCollections: ["fandom/dc-extended-universe"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2016-08-05",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/suicide-squad-2016",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
