import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackMirrorS01e02 = {
  id: "01a18843-982a-7078-b457-ce22b92ee646",
  type: "page-type/episode",
  slug: "black-mirror-s01e02",
  description:
    "After failing to impress the judges on a singing competition show, a woman must either perform degrading acts or return to a slave-like existence.",
  ownLength: 62,
  ownProgress: 0,
  partOfCollections: ["season/black-mirror-season-1"],
  position: 2,
  publishedAt: "2011-12-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "877836",
      externalLink: "https://www.themoviedb.org/tv/42009/season/1/episode/2",
    },
  ],
  title: "Fifteen Million Merits",
  episodeType: "standard",
  stillPath: "/c62HKSbeTRkatK223O3m58CmmPd.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:24:53.673Z",
  updatedAt: "2026-10-29T15:24:53.673Z",
} as const satisfies Episode
