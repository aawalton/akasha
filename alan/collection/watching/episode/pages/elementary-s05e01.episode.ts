import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS05e01 = {
  id: "01a1887e-62ac-74f0-b7ad-091c84f06c6b",
  type: "page-type/episode",
  slug: "elementary-s05e01",
  description:
    "When a serial bomber becomes active again after being dormant for six years, Watson seeks help from Shinwell Johnson, a former patient whose life she saved when she was a surgeon. Also, Holmes senses Watson is unhappy and questions whether she is still fulfilled by her detective career.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/elementary-season-5"],
  position: 1,
  publishedAt: "2016-10-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1211692",
      externalLink: "https://www.themoviedb.org/tv/1415/season/5/episode/1",
    },
  ],
  title: "Folie à Deux",
  episodeType: "standard",
  stillPath: "/jNiZddLymxN6W9ySIKyrzOa4Pfr.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
