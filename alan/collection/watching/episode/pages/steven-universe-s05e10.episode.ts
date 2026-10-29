import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS05e10 = {
  id: "01a18855-67eb-75a3-939c-8b53398bed4c",
  type: "page-type/episode",
  slug: "steven-universe-s05e10",
  description: "Kevin is throwing a party, and Steven is invited.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-5"],
  position: 10,
  publishedAt: "2017-12-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1391861",
      externalLink: "https://www.themoviedb.org/tv/61175/season/5/episode/10",
    },
  ],
  title: "Kevin Party",
  episodeType: "standard",
  stillPath: "/kX66f9VPvY7CXz3HIhpfvgJQ4eg.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
