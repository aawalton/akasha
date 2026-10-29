import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS05e02 = {
  id: "01a18855-67eb-7418-9f67-439dd05cd3fd",
  type: "page-type/episode",
  slug: "steven-universe-s05e02",
  description:
    "Steven goes to court against Blue and Yellow Diamond to determine his (or rather Rose Quartz's) fate.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-5"],
  position: 2,
  publishedAt: "2017-05-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1313215",
      externalLink: "https://www.themoviedb.org/tv/61175/season/5/episode/2",
    },
  ],
  title: "The Trial",
  episodeType: "standard",
  stillPath: "/klZxeiq8gOkbkXrKAiXQBhcVeCh.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
