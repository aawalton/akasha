import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const haikyuSeason3 = {
  id: "01a183d2-cc4d-799d-beb9-5c95d148c943",
  type: "page-type/season",
  slug: "haikyu-season-3",
  description:
    "The Karasuno High volleyball team has finally made it to the Miyagi Prefectural finals. But they're up against the reigning champs: Shiratorizawa.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/haikyu"],
  position: 3,
  publishedAt: "2016-10-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "76038",
      externalLink: "https://www.themoviedb.org/tv/60863/season/3",
    },
  ],
  title: "Karasuno High School vs Shiratorizawa Academy",
  posterPath: "/deFGQIm9cKYGr2xt136RUnA9sb5.jpg",
  voteAverage: 9,
  createdAt: "2026-10-28T18:43:12.581Z",
  updatedAt: "2026-10-28T18:43:12.581Z",
} as const satisfies Season
