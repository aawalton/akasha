import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS02e05 = {
  id: "01a18855-67e7-73bd-a4ab-d22d51efb661",
  type: "page-type/episode",
  slug: "steven-universe-s02e05",
  description: "Greg tells Steven the story of when he first met Rose Quartz.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-2"],
  position: 5,
  publishedAt: "2015-04-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1921005",
      externalLink: "https://www.themoviedb.org/tv/61175/season/2/episode/5",
    },
  ],
  title: "Story for Steven",
  episodeType: "standard",
  stillPath: "/P4krC5WWZIxcbK2AWZ3mrzDuLj.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
