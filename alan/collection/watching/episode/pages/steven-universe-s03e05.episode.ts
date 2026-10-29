import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS03e05 = {
  id: "01a18855-67e9-7723-8008-1eceb9eb6b20",
  type: "page-type/episode",
  slug: "steven-universe-s03e05",
  description: "When an envoy of Rubies arrive, Steven proposes a game of baseball.",
  ownLength: 11,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-3"],
  position: 5,
  publishedAt: "2016-06-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1197345",
      externalLink: "https://www.themoviedb.org/tv/61175/season/3/episode/5",
    },
  ],
  title: "Hit the Diamond",
  episodeType: "mid-season",
  stillPath: "/iceFrVADCw109W5DL7tXkKSIrPY.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
