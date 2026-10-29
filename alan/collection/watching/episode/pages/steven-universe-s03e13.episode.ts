import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS03e13 = {
  id: "01a18855-67e9-74b5-83f5-61ed43ef9f1f",
  type: "page-type/episode",
  slug: "steven-universe-s03e13",
  description: "Kiki has nightmares and Steven intervenes.",
  ownLength: 11,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-3"],
  position: 13,
  publishedAt: "2016-07-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1209644",
      externalLink: "https://www.themoviedb.org/tv/61175/season/3/episode/13",
    },
  ],
  title: "Kiki’s Pizza Delivery Service",
  episodeType: "standard",
  stillPath: "/s1MjCPvDs0JdipScYMVzcPXxPPD.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
