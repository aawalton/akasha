import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS18e13 = {
  id: "01a1884b-ef7a-7373-b50e-63809c1f8c20",
  type: "page-type/episode",
  slug: "ncis-s18e13",
  description:
    "The team investigates a cyclist killed in a hit and run. Gibbs prepares to testify against a financial advisor who stole millions from his Navy clients.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-18"],
  position: 13,
  publishedAt: "2021-05-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2704078",
      externalLink: "https://www.themoviedb.org/tv/4614/season/18/episode/13",
    },
  ],
  title: "Misconduct",
  episodeType: "standard",
  stillPath: "/f00ULeYDQK5l6OTmlhDFZp0eP2c.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
