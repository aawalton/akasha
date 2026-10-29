import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS01e11 = {
  id: "01a18852-a9f5-7d71-badc-4ad2983b04c0",
  type: "page-type/episode",
  slug: "star-trek-discovery-s01e11",
  description:
    "The crew continues their guise, and Burnham is ordered on a merciless mission to end the resistance in hopes of returning home. Meanwhile, Tilly works on restoring Stamets’ neurofunction.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-1"],
  position: 11,
  publishedAt: "2018-01-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1418612",
      externalLink: "https://www.themoviedb.org/tv/67198/season/1/episode/11",
    },
  ],
  title: "The Wolf Inside",
  episodeType: "standard",
  stillPath: "/aX43537EoHEq0eFVrWNofm0yewF.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
