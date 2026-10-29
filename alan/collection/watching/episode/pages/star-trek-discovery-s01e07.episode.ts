import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS01e07 = {
  id: "01a18852-a9f5-75d7-94a8-bfdc480ac519",
  type: "page-type/episode",
  slug: "star-trek-discovery-s01e07",
  description:
    "As the U.S.S. Discovery crew attempts to let loose at a party, an unwelcome visitor comes aboard bringing about a problematic and twisted sequence of events.",
  ownLength: 47,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-1"],
  position: 7,
  publishedAt: "2017-10-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1379787",
      externalLink: "https://www.themoviedb.org/tv/67198/season/1/episode/7",
    },
  ],
  title: "Magic to Make the Sanest Man Go Mad",
  episodeType: "standard",
  stillPath: "/j6gpzxVAW3ewd2MGqPTz0CKsKRv.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
