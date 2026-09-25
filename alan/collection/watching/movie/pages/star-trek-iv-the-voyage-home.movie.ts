import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const starTrekIvTheVoyageHome = {
  id: "01a06802-6d99-7041-bfcd-0d870005132c",
  type: "page-type/movie",
  slug: "star-trek-iv-the-voyage-home",
  title: "Star Trek IV: The Voyage Home",
  partOfCollections: ["fandom/star-trek-3"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "1986-11-26",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/star-trek-iv-the-voyage-home-1986",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
