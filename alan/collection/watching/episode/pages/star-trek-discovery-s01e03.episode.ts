import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS01e03 = {
  id: "01a18852-a9f5-7889-a4b7-810d4d8fad81",
  type: "page-type/episode",
  slug: "star-trek-discovery-s01e03",
  description:
    "Burnham finds herself aboard the U.S.S. Discovery where she quickly realizes things are not as they seem, including the mysterious Captain Gabriel Lorca.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-1"],
  position: 3,
  publishedAt: "2017-10-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1345592",
      externalLink: "https://www.themoviedb.org/tv/67198/season/1/episode/3",
    },
  ],
  title: "Context Is for Kings",
  episodeType: "standard",
  stillPath: "/AamOrCV7i2COmHPmbfsw0MKnOUm.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
