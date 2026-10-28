import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bocchiTheRockS01e12 = {
  id: "01a183d9-6b68-76bc-a6cb-0ce1c0081c82",
  type: "page-type/episode",
  slug: "bocchi-the-rock-s01e12",
  description:
    "Kessoku Band's performance at the culture festival is on. Can the band make it through without disaster?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/bocchi-the-rock-season-1"],
  position: 12,
  publishedAt: "2022-12-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3990004",
      externalLink: "https://www.themoviedb.org/tv/119100/season/1/episode/12",
    },
  ],
  title: "Morning Light Falls on You",
  episodeType: "finale",
  stillPath: "/lNROIsWepnKfgLhNrQXyaqi29dO.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:50:26.535Z",
  updatedAt: "2026-10-28T18:50:26.535Z",
} as const satisfies Episode
