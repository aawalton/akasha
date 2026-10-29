import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e18 = {
  id: "01a1884b-ef63-784d-9067-91c8d0afbfb3",
  type: "page-type/episode",
  slug: "ncis-s01e18",
  description:
    "The team are looking for an ex-SEAL who escaped from prison in search of revenge. He is determined to find the real murderer of his wife.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 18,
  publishedAt: "2004-04-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334447",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/18",
    },
  ],
  title: "UnSEALed",
  episodeType: "standard",
  stillPath: "/y3fYfkx4sJbjB5rnu8uAC2Oqxhd.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
