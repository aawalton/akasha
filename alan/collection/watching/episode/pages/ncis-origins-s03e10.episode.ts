import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisOriginsS03e10 = {
  id: "01a1884b-534b-7b43-a57e-36b146201fab",
  type: "page-type/episode",
  slug: "ncis-origins-s03e10",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/ncis-origins-season-3"],
  position: 10,
  publishedAt: "2026-12-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7984994",
      externalLink: "https://www.themoviedb.org/tv/243006/season/3/episode/10",
    },
  ],
  title: "Episode 10",
  episodeType: "finale",
  voteAverage: 0,
  createdAt: "2026-10-29T15:33:20.328Z",
  updatedAt: "2026-10-29T15:33:20.328Z",
} as const satisfies Episode
