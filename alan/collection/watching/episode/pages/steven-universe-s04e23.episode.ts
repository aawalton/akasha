import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS04e23 = {
  id: "01a18855-67eb-7ae5-a6bc-4c5d42af7ebf",
  type: "page-type/episode",
  slug: "steven-universe-s04e23",
  description: "People disappearing from Beach City, and Steven tries to solve the mystery.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-4"],
  position: 23,
  publishedAt: "2017-05-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1303983",
      externalLink: "https://www.themoviedb.org/tv/61175/season/4/episode/23",
    },
  ],
  title: "Are You My Dad?",
  episodeType: "standard",
  stillPath: "/lLlDmLwh4aWQrhraY0T2TRubX5T.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
