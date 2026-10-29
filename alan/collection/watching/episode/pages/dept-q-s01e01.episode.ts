import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const deptQS01e01 = {
  id: "01a18883-b6af-7be6-880b-071208584413",
  type: "page-type/episode",
  slug: "dept-q-s01e01",
  description:
    "DCI Carl Morck returns to work after a near-fatal incident and finds himself head of a new department. A prosecutor faces a tough day in court.",
  ownLength: 65,
  ownProgress: 65,
  partOfCollections: ["season/dept-q-season-1"],
  position: 1,
  publishedAt: "2025-05-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5129235",
      externalLink: "https://www.themoviedb.org/tv/245703/season/1/episode/1",
    },
  ],
  title: "Episode 1",
  episodeType: "standard",
  stillPath: "/8m1qs3eJFrA4SeW37CTObGZ04PZ.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T16:34:55.790Z",
  updatedAt: "2026-10-29T16:34:55.790Z",
} as const satisfies Episode
