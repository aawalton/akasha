import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoShippudenS01e21 = {
  id: "01a183d2-3bd5-7bb0-84f0-d6c90e38009b",
  type: "page-type/episode",
  slug: "naruto-shippuden-s01e21",
  description:
    "Granny Chiyo and Sakura manage to expose Sasori, who amazingly looks no older than he did twenty years earlier.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/naruto-shippuden-season-1"],
  position: 21,
  publishedAt: "2007-07-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "761503",
      externalLink: "https://www.themoviedb.org/tv/31910/season/1/episode/21",
    },
  ],
  title: "Sasori's Real Face",
  episodeType: "standard",
  stillPath: "/naf00mOdEW1tAVKwXLdzO2Ioqbn.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:42:35.603Z",
  updatedAt: "2026-10-28T18:42:35.603Z",
} as const satisfies Episode
