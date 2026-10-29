import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e08 = {
  id: "01a1884b-ef62-7efe-bf32-300f27d178ae",
  type: "page-type/episode",
  slug: "ncis-s01e08",
  description:
    "The NCIS team head to Cuba to investigate a Navy translator's connection to smuggling at a detention center after he suddenly dies at the wheel of his car when returning to the U.S. from Guantanamo Bay.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 8,
  publishedAt: "2003-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334437",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/8",
    },
  ],
  title: "Minimum Security",
  episodeType: "standard",
  stillPath: "/wAJhjll19qVLP9uTejZ4lUPCX8H.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
