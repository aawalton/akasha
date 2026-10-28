import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const attackOnTitanS03e02 = {
  id: "01a183d1-6a24-7124-b583-ea2e89262c3a",
  type: "page-type/episode",
  slug: "attack-on-titan-s03e02",
  description:
    "The Scouts take a stand against a new enemy, but it's not just Titans they'll be fighting anymore.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/attack-on-titan-season-3"],
  position: 2,
  publishedAt: "2018-07-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1528757",
      externalLink: "https://www.themoviedb.org/tv/1429/season/3/episode/2",
    },
  ],
  title: "Pain",
  episodeType: "standard",
  stillPath: "/5qFlHCtb82MWuMf72NgXltjnq96.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-28T18:41:41.918Z",
  updatedAt: "2026-10-28T18:41:41.918Z",
} as const satisfies Episode
