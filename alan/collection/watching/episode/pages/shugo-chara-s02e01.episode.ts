import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const shugoCharaS02e01 = {
  id: "01a183d9-d690-7c25-a5d2-178e14739133",
  type: "page-type/episode",
  slug: "shugo-chara-s02e01",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/shugo-chara-season-2"],
  position: 1,
  publishedAt: "2008-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "519776",
      externalLink: "https://www.themoviedb.org/tv/14451/season/2/episode/1",
    },
  ],
  title: "Sparkle With All Your Might!",
  episodeType: "standard",
  stillPath: "/5ZbaXzc2AIgsMr0kKy6rjlsCx7w.jpg",
  voteAverage: 0,
  createdAt: "2026-10-28T18:50:53.965Z",
  updatedAt: "2026-10-28T18:50:53.965Z",
} as const satisfies Episode
