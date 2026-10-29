import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS02e09 = {
  id: "01a18851-3df4-7eb7-a58c-ecbe96f58057",
  type: "page-type/episode",
  slug: "person-of-interest-s02e09",
  description:
    "When the machine names a New York cabdriver as a person of interest, any of his passengers could be a part of the impending crime.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-2"],
  position: 9,
  publishedAt: "2012-12-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64086",
      externalLink: "https://www.themoviedb.org/tv/1411/season/2/episode/9",
    },
  ],
  title: "C.O.D.",
  episodeType: "standard",
  stillPath: "/6ktq1ipee8Dah2Xskz0R3XaEAqX.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
