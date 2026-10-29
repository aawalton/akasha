import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS17e20 = {
  id: "01a1884b-ef7a-7bce-9750-a51b5a92aa4a",
  type: "page-type/episode",
  slug: "ncis-s17e20",
  description:
    "The team tries to verify the identity of Joe Smith, who claims he served on the U.S.S. Arizona during the attack on Pearl Harbor, and wants to be buried there upon his death.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-17"],
  position: 20,
  publishedAt: "2020-04-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2201068",
      externalLink: "https://www.themoviedb.org/tv/4614/season/17/episode/20",
    },
  ],
  title: "The Arizona",
  episodeType: "finale",
  stillPath: "/gX56I2MOYijRIwhfMB4glPqcfoK.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
