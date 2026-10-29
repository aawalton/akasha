import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS19e05 = {
  id: "01a18855-c2a0-7c5e-ab14-e250f325b9c0",
  type: "page-type/episode",
  slug: "studio-c-s19e05",
  description:
    "Travel to the moon, Hogwarts, or a timeshare vacation. Try a new cold medicine or visit a doctor.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-19"],
  position: 5,
  publishedAt: "2024-11-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5678551",
      externalLink: "https://www.themoviedb.org/tv/68207/season/19/episode/5",
    },
  ],
  title: "Nagini Weenie Baby",
  episodeType: "standard",
  stillPath: "/8sEZnU0MtOiGdKeILnUxtX2U9be.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
