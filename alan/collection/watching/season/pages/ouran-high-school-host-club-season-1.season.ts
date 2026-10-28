import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ouranHighSchoolHostClubSeason1 = {
  id: "01a183d5-3fb0-73f1-bd73-ca820506b3c5",
  type: "page-type/season",
  slug: "ouran-high-school-host-club-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/ouran-high-school-host-club"],
  position: 1,
  publishedAt: "2006-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2972",
      externalLink: "https://www.themoviedb.org/tv/1043/season/1",
    },
  ],
  title: "Ouran High School Host Club Season 1",
  posterPath: "/zZbt1mGPhnYZQuuZXnuX2jX5GBp.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-28T18:45:53.198Z",
  updatedAt: "2026-10-28T18:45:53.198Z",
} as const satisfies Season
