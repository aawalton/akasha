import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS01e01 = {
  id: "01a1887e-62a5-7d10-83f7-6bba8e2043f4",
  type: "page-type/episode",
  slug: "elementary-s01e01",
  description:
    "Detective Sherlock Holmes, along with his sober companion, Dr. Joan Watson, uses his uncanny ability to read people and analyze crimes to assist the NYPD on some of their more difficult cases. In the season premiere, Holmes consults on a home invasion that resulted in murder.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/elementary-season-1"],
  position: 1,
  publishedAt: "2012-09-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64286",
      externalLink: "https://www.themoviedb.org/tv/1415/season/1/episode/1",
    },
  ],
  title: "Pilot",
  episodeType: "standard",
  stillPath: "/14PEsYWrZGYaQONPxQHaHjqufK5.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
