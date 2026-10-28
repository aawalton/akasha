import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const nanaSeason1 = {
  id: "01a183d5-677a-7f60-a8b1-bda1c4d94781",
  type: "page-type/season",
  slug: "nana-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/nana"],
  position: 1,
  publishedAt: "2006-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "58239",
      externalLink: "https://www.themoviedb.org/tv/56568/season/1",
    },
  ],
  title: "NANA Season 1",
  posterPath: "/y4Sa55TH2pNAD5BYynS8azFqhB8.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:46:03.381Z",
  updatedAt: "2026-10-28T18:46:03.381Z",
} as const satisfies Season
