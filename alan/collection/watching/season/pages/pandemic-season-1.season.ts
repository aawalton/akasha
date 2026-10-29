import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const pandemicSeason1 = {
  id: "01a18850-48f3-7cc8-9f22-571504d8d847",
  type: "page-type/season",
  slug: "pandemic-season-1",
  description:
    "The bird flu virus spreads through Los Angeles as a doctor from the CDC races to find a vaccine",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/pandemic"],
  position: 1,
  publishedAt: "2007-05-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "100025",
      externalLink: "https://www.themoviedb.org/tv/41322/season/1",
    },
  ],
  title: "Miniseries",
  posterPath: "/1Fl0BGJ9mrPWl1wzLX0UKFJ0Rcj.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:38:45.363Z",
  updatedAt: "2026-10-29T15:38:45.363Z",
} as const satisfies Season
