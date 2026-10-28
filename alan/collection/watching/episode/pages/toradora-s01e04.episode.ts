import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const toradoraS01e04 = {
  id: "01a183d9-26d7-7463-993b-58409fc9a536",
  type: "page-type/episode",
  slug: "toradora-s01e04",
  description:
    "Taiga has a photo album full of blurry pictures of Kitamura. Ryūji offers to snap some pictures of him instead.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/toradora-season-1"],
  position: 4,
  publishedAt: "2008-10-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "883616",
      externalLink: "https://www.themoviedb.org/tv/42916/season/1/episode/4",
    },
  ],
  title: "That Look You Had",
  episodeType: "standard",
  stillPath: "/gdoaYuezn30Rkv2Vx5lRiIfZZze.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-28T18:50:08.982Z",
  updatedAt: "2026-10-28T18:50:08.982Z",
} as const satisfies Episode
