import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS02e16 = {
  id: "01a18843-d150-763e-95ee-c1ab8ff5594b",
  type: "page-type/episode",
  slug: "bluey-s02e16",
  description:
    "Jack's the new dog at school and the newest recruit in Rusty's army. Jack struggles with following instructions and always forgets his hat but Rusty will make a soldier of him yet.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-2"],
  position: 16,
  publishedAt: "2020-04-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2194162",
      externalLink: "https://www.themoviedb.org/tv/82728/season/2/episode/16",
    },
  ],
  title: "Army",
  episodeType: "standard",
  stillPath: "/bWTMKLnIoFBMTXvbT7Wnt40JKNm.jpg",
  voteAverage: 5.6,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
