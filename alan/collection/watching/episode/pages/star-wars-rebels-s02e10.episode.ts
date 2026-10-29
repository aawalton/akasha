import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS02e10 = {
  id: "01a18853-ddfd-71cf-8d7e-bb8bb6c8406d",
  type: "page-type/episode",
  slug: "star-wars-rebels-s02e10",
  description:
    "During the early rebellion against the rule of the Galactic Empire, Princess Leia Organa of Alderaan is sent to the planet Lothal on a mission to provide ships for the rebel fleet. When the Empire initiates a lockdown, her plan is thrown into jeopardy",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-2"],
  position: 10,
  publishedAt: "2016-01-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1158129",
      externalLink: "https://www.themoviedb.org/tv/60554/season/2/episode/10",
    },
  ],
  title: "A Princess on Lothal",
  episodeType: "standard",
  stillPath: "/14qs5viLvfL3vtkDcqtffMmcO49.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
