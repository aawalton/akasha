import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisOriginsS03e07 = {
  id: "01a1884b-534b-775b-86c5-d772f7a3d6a5",
  type: "page-type/episode",
  slug: "ncis-origins-s03e07",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/ncis-origins-season-3"],
  position: 7,
  publishedAt: "2026-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7982125",
      externalLink: "https://www.themoviedb.org/tv/243006/season/3/episode/7",
    },
  ],
  title: "Episode 7",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:33:20.328Z",
  updatedAt: "2026-10-29T15:33:20.328Z",
} as const satisfies Episode
