import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const iAmGrootS01e03 = {
  id: "01a1887e-c695-7cfd-b68b-90cbb846b0e0",
  type: "page-type/episode",
  slug: "i-am-groot-s01e03",
  description:
    "Groot investigates a spooky noise that’s been haunting the Quadrant, which leads to an intense dance off.",
  ownLength: 6,
  ownProgress: 6,
  partOfCollections: ["season/i-am-groot-season-1"],
  position: 3,
  publishedAt: "2022-08-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4711226",
      externalLink: "https://www.themoviedb.org/tv/232125/season/1/episode/3",
    },
  ],
  title: "Groot's Pursuit",
  episodeType: "standard",
  stillPath: "/nv0q5V1vGwRVO4Rv3MOEmniUbWj.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T16:29:32.180Z",
  updatedAt: "2026-10-29T16:29:32.180Z",
} as const satisfies Episode
