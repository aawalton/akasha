import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS02e13 = {
  id: "01a18853-f9b0-70ad-89d9-21aee27cbdeb",
  type: "page-type/episode",
  slug: "star-wars-resistance-s02e13",
  description:
    "Kaz and Norath try to help their friends while being pursued by a deadly bounty hunter.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-2"],
  position: 13,
  publishedAt: "2019-12-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1992477",
      externalLink: "https://www.themoviedb.org/tv/79093/season/2/episode/13",
    },
  ],
  title: "Breakout",
  episodeType: "standard",
  stillPath: "/pKRglYMXcZ9vzm4XGRBNLckyTkq.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
