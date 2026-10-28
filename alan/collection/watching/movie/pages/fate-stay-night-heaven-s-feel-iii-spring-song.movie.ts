import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fateStayNightHeavenSFeelIiiSpringSong = {
  id: "01a183d9-614e-7c03-927e-0b89e75e97e8",
  type: "page-type/movie",
  slug: "fate-stay-night-heaven-s-feel-iii-spring-song",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["fandom/fate"],
  publishedAt: "2020-08-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "390635",
      externalLink: "https://www.themoviedb.org/movie/390635",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Fate/stay night: Heaven's Feel III. Spring Song",
  streamingOn: ["streaming-service/crunchyroll", "streaming-service/hulu"],
  createdAt: "2026-10-28T18:50:23.950Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
