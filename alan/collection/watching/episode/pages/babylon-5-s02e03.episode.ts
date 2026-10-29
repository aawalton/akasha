import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S02e03 = {
  id: "01a18843-507f-74e7-a1c6-578350190725",
  type: "page-type/episode",
  slug: "babylon-5-s02e03",
  description:
    'A mysterious group known as "techno-mages" take up temporary residence at Babylon 5 and Londo is very eager to get an audience with them. Meanwhile, the Drazi cause problems for the newly promoted Commander Ivanova with their rather unusual election process.',
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-the-coming-of-shadows"],
  position: 3,
  publishedAt: "1994-11-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235857",
      externalLink: "https://www.themoviedb.org/tv/3137/season/2/episode/3",
    },
  ],
  title: "The Geometry of Shadows",
  episodeType: "standard",
  stillPath: "/dSUE56QZWUy9EgWwsPlmGwhVeDF.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
