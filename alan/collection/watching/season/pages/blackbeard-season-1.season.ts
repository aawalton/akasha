import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const blackbeardSeason1 = {
  id: "01a18843-a12b-7ec5-849a-b740f6f63448",
  type: "page-type/season",
  slug: "blackbeard-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/blackbeard"],
  position: 1,
  publishedAt: "2006-06-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "90702",
      externalLink: "https://www.themoviedb.org/tv/72954/season/1",
    },
  ],
  title: "Miniseries",
  posterPath: "/iAl2YEGf7ulyWW2F8KVPrAp1E7f.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:24:55.979Z",
  updatedAt: "2026-10-29T15:24:55.979Z",
} as const satisfies Season
