import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const youngSherlockSeason2 = {
  id: "01a1447e-0758-7d47-a145-be282ac2c930",
  type: "page-type/season",
  slug: "young-sherlock-season-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/young-sherlock"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "533236",
      externalLink: "https://www.themoviedb.org/tv/255661/season/2",
    },
  ],
  title: "Young Sherlock Season 2",
  voteAverage: 0,
  createdAt: "2026-10-16T11:34:32.535Z",
  updatedAt: "2026-10-16T11:34:32.535Z",
} as const satisfies Season
