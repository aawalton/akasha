import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e05 = {
  id: "01a1884b-ef77-75b9-8e09-c1b09e2bcf17",
  type: "page-type/episode",
  slug: "ncis-s16e05",
  description:
    "After a 50-year-old tape recording left by a murder victim is found, the NCIS team tries to exonerate Ray Jennings, the Marine serving a life sentence for the crime.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 5,
  publishedAt: "2018-10-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1598582",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/5",
    },
  ],
  title: "Fragments",
  episodeType: "standard",
  stillPath: "/dI7T9wOJCRb04tiw25CKLc7Y0NK.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
