import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS18e05 = {
  id: "01a1884b-ef7a-7d9d-9a6f-0a51b1e706c0",
  type: "page-type/episode",
  slug: "ncis-s18e05",
  description:
    "Gibbs and Fornell's crusade to find the head of the drug ring responsible for Fornell's daughter Emily's overdose comes to a climax.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-18"],
  position: 5,
  publishedAt: "2021-01-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2613990",
      externalLink: "https://www.themoviedb.org/tv/4614/season/18/episode/5",
    },
  ],
  title: "Head of the Snake",
  episodeType: "standard",
  stillPath: "/5cUFaWfvjBjRvwoFFZDpoHU11SP.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
