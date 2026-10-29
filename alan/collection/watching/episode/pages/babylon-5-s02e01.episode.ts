import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S02e01 = {
  id: "01a18843-507f-7ed6-8695-2fa6218ab9ea",
  type: "page-type/episode",
  slug: "babylon-5-s02e01",
  description:
    "Sheridan arrives at Babylon 5 to replace Sinclair and deal with a renegade Minbari Cruiser.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-the-coming-of-shadows"],
  position: 1,
  publishedAt: "1994-11-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235855",
      externalLink: "https://www.themoviedb.org/tv/3137/season/2/episode/1",
    },
  ],
  title: "Points of Departure",
  episodeType: "standard",
  stillPath: "/5roNJfrHOGaJHauf9Jz09L1KfyP.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
