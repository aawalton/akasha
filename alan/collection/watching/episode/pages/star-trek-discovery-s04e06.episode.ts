import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS04e06 = {
  id: "01a18852-a9f7-7ba9-9d00-d3fe3ac83d30",
  type: "page-type/episode",
  slug: "star-trek-discovery-s04e06",
  description:
    "Seeking answers, the U.S.S. Discovery ventures into a subspace rift created by the Dark Matter Anomaly. Meanwhile, Book faces a strange visitor from his past.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-4"],
  position: 6,
  publishedAt: "2021-12-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3396836",
      externalLink: "https://www.themoviedb.org/tv/67198/season/4/episode/6",
    },
  ],
  title: "Stormy Weather",
  episodeType: "standard",
  stillPath: "/vOaVmVveQjU5EbSHlNFIr3HxsVQ.jpg",
  voteAverage: 4.9,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
