import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const toradoraS01e01 = {
  id: "01a183d9-26d6-7b84-883e-896922c1daa6",
  type: "page-type/episode",
  slug: "toradora-s01e01",
  description:
    "On the first day of school, Ryūji discovers that he and Taiga, the meanest girl in class, share a secret: each loves the other's best friend.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/toradora-season-1"],
  position: 1,
  publishedAt: "2008-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "883614",
      externalLink: "https://www.themoviedb.org/tv/42916/season/1/episode/1",
    },
  ],
  title: "Tiger and Dragon",
  episodeType: "standard",
  stillPath: "/iFN4nTalN1pNvls0oOncUdSAMvq.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-28T18:50:08.982Z",
  updatedAt: "2026-10-28T18:50:08.982Z",
} as const satisfies Episode
