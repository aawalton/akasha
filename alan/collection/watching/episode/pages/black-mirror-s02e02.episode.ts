import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackMirrorS02e02 = {
  id: "01a18843-982a-707e-9674-bb735a6b6814",
  type: "page-type/episode",
  slug: "black-mirror-s02e02",
  description:
    "Victoria wakes up and cannot remember anything about her life. Everyone she encounters refuses to communicate with her.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/black-mirror-season-2"],
  position: 2,
  publishedAt: "2013-02-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "877840",
      externalLink: "https://www.themoviedb.org/tv/42009/season/2/episode/2",
    },
  ],
  title: "White Bear",
  episodeType: "standard",
  stillPath: "/lSua0MfjmtLb8LKICqIiaGkcieL.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:24:53.673Z",
  updatedAt: "2026-10-29T15:24:53.673Z",
} as const satisfies Episode
