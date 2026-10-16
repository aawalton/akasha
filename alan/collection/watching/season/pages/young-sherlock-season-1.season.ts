import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const youngSherlockSeason1 = {
  id: "01a1447e-0758-7f4e-af26-a6d228cc44fc",
  type: "page-type/season",
  slug: "young-sherlock-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/young-sherlock"],
  position: 1,
  publishedAt: "2026-03-04",
  status: "in-progress",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "396168",
      externalLink: "https://www.themoviedb.org/tv/255661/season/1",
    },
  ],
  title: "Young Sherlock Season 1",
  posterPath: "/BMBWTgvL41sOYtfkmXen6nm9mG.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-16T11:34:32.535Z",
  updatedAt: "2026-10-16T11:34:32.535Z",
} as const satisfies Season
