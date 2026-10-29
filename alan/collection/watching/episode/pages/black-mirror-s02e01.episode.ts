import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackMirrorS02e01 = {
  id: "01a18843-982a-7921-830e-d51828a29ff8",
  type: "page-type/episode",
  slug: "black-mirror-s02e01",
  description:
    "After learning about a new service that lets people stay in touch with the deceased, a lonely, grieving Martha reconnects with her late lover.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/black-mirror-season-2"],
  position: 1,
  publishedAt: "2013-02-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "877841",
      externalLink: "https://www.themoviedb.org/tv/42009/season/2/episode/1",
    },
  ],
  title: "Be Right Back",
  episodeType: "standard",
  stillPath: "/4CbgmvnUVVInKfUqVMv1GSIY0ZT.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:24:53.673Z",
  updatedAt: "2026-10-29T15:24:53.673Z",
} as const satisfies Episode
