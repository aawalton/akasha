import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisOriginsS03e05 = {
  id: "01a1884b-534a-738e-be20-a8816fda237b",
  type: "page-type/episode",
  slug: "ncis-origins-s03e05",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/ncis-origins-season-3"],
  position: 5,
  publishedAt: "2026-11-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7905045",
      externalLink: "https://www.themoviedb.org/tv/243006/season/3/episode/5",
    },
  ],
  title: "Baila Esta Cumbia",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:33:20.328Z",
  updatedAt: "2026-10-29T15:33:20.328Z",
} as const satisfies Episode
