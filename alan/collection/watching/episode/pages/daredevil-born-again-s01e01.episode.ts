import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const daredevilBornAgainS01e01 = {
  id: "01a18845-d65b-7507-bfca-56a4a3d1628f",
  type: "page-type/episode",
  slug: "daredevil-born-again-s01e01",
  description: "Matt Murdock gives up the mask. Wilson Fisk has his sights set to new heights.",
  ownLength: 61,
  ownProgress: 0,
  partOfCollections: ["season/daredevil-born-again-season-1"],
  position: 1,
  publishedAt: "2025-03-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3736153",
      externalLink: "https://www.themoviedb.org/tv/202555/season/1/episode/1",
    },
  ],
  title: "Heaven's Half Hour",
  episodeType: "standard",
  stillPath: "/cbOOHuurtiG7XluczaWr0y9SO1q.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:27:20.667Z",
  updatedAt: "2026-10-29T15:27:20.667Z",
} as const satisfies Episode
