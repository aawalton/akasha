import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS01e08 = {
  id: "01a18852-a9f5-7b48-984a-39b2d36f808e",
  type: "page-type/episode",
  slug: "star-trek-discovery-s01e08",
  description:
    "The U.S.S. Discovery is tasked with a high priority mission to planet Pahvo and learn the science behind the Klingon's cloaking technology.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-1"],
  position: 8,
  publishedAt: "2017-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1380335",
      externalLink: "https://www.themoviedb.org/tv/67198/season/1/episode/8",
    },
  ],
  title: "Si Vis Pacem, Para Bellum",
  episodeType: "standard",
  stillPath: "/mETRqM74dY79tBJlwSKVIoXM7gR.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
