import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const iAmGrootS01e01 = {
  id: "01a1887e-c694-7dbd-9efe-4f162aa326fd",
  type: "page-type/episode",
  slug: "i-am-groot-s01e01",
  description:
    "Baby Groot takes his first steps out of his pot, only to learn you have to walk before you can run.",
  ownLength: 6,
  ownProgress: 6,
  partOfCollections: ["season/i-am-groot-season-1"],
  position: 1,
  publishedAt: "2022-08-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4711223",
      externalLink: "https://www.themoviedb.org/tv/232125/season/1/episode/1",
    },
  ],
  title: "Groot's First Steps",
  episodeType: "standard",
  stillPath: "/iecIwrRoq1uZfhJ9XRrZD29Zr4R.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T16:29:32.180Z",
  updatedAt: "2026-10-29T16:29:32.180Z",
} as const satisfies Episode
