import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS03e13 = {
  id: "01a18852-a9f7-773e-b26f-8ec85275cb6a",
  type: "page-type/episode",
  slug: "star-trek-discovery-s03e13",
  description:
    "As the Emerald Chain tightens its grip and the mystery of the Burn is finally solved, Burnham and the crew have one last chance to save themselves - and the Federation.",
  ownLength: 61,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-3"],
  position: 13,
  publishedAt: "2021-01-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2465805",
      externalLink: "https://www.themoviedb.org/tv/67198/season/3/episode/13",
    },
  ],
  title: "That Hope Is You (2)",
  episodeType: "finale",
  stillPath: "/ebddkXFMaPxNrqPstDOXjqBt26S.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
