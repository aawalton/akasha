import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const deptQSeason2 = {
  id: "01a18845-f1d0-7c1e-995f-731ea336453d",
  type: "page-type/season",
  slug: "dept-q-season-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/dept-q"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "493536",
      externalLink: "https://www.themoviedb.org/tv/245703/season/2",
    },
  ],
  title: "Dept. Q Season 2",
  posterPath: "/33cbXLBzFhw2NAzFHEE1yKLAWwJ.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:27:27.695Z",
  updatedAt: "2026-10-29T15:27:27.695Z",
} as const satisfies Season
