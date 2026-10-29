import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackMirrorS04e05 = {
  id: "01a18843-982b-7dff-8785-204fdbd73543",
  type: "page-type/episode",
  slug: "black-mirror-s04e05",
  description:
    "At an abandoned warehouse, scavengers searching for supplies encounter a ruthless foe and flee for their lives through a bleak wasteland.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/black-mirror-season-4"],
  position: 5,
  publishedAt: "2017-12-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1402688",
      externalLink: "https://www.themoviedb.org/tv/42009/season/4/episode/5",
    },
  ],
  title: "Metalhead",
  episodeType: "standard",
  stillPath: "/8mMSk4cGfIftbIoA2Mq83LpzYlw.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:24:53.673Z",
  updatedAt: "2026-10-29T15:24:53.673Z",
} as const satisfies Episode
