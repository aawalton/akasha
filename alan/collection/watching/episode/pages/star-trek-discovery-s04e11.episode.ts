import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS04e11 = {
  id: "01a18852-a9f7-7893-842e-227110156198",
  type: "page-type/episode",
  slug: "star-trek-discovery-s04e11",
  description:
    "While Captain Burnham leads an away mission to a planet that was once home to the aliens responsible for the DMA, Book and Tarka secretly infiltrate the U.S.S. Discovery.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-4"],
  position: 11,
  publishedAt: "2022-03-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3525030",
      externalLink: "https://www.themoviedb.org/tv/67198/season/4/episode/11",
    },
  ],
  title: "Rosetta",
  episodeType: "standard",
  stillPath: "/AlDYsOnyCCSZRtqrP6oCZgateW5.jpg",
  voteAverage: 4.9,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
