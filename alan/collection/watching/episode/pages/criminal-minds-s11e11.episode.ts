import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS11e11 = {
  id: "01a18844-d7f4-700c-836b-1be4fdc649a6",
  type: "page-type/episode",
  slug: "criminal-minds-s11e11",
  description:
    "The BAU implements an elaborate strategy to try and take down the “Dirty Dozen” hitmen ring, with Reid playing a central role.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-11"],
  position: 11,
  publishedAt: "2016-01-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1143137",
      externalLink: "https://www.themoviedb.org/tv/4057/season/11/episode/11",
    },
  ],
  title: "Entropy",
  episodeType: "standard",
  stillPath: "/kPFWUqsGeufPYqWnEOad8xTiwLY.jpg",
  voteAverage: 8.9,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
