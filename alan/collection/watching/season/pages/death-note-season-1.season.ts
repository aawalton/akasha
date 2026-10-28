import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const deathNoteSeason1 = {
  id: "01a183d2-adb2-7e81-84c2-54b0b0926296",
  type: "page-type/season",
  slug: "death-note-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/death-note"],
  position: 1,
  publishedAt: "2006-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "59776",
      externalLink: "https://www.themoviedb.org/tv/13916/season/1",
    },
  ],
  title: "Death Note Season 1",
  posterPath: "/1BloDOEmKxPFzbCIuNCLmCrcx6L.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:43:04.751Z",
  updatedAt: "2026-10-28T18:43:04.751Z",
} as const satisfies Season
