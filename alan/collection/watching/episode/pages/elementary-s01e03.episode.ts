import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS01e03 = {
  id: "01a1887e-62a5-79d8-a1b7-91d4a8b010d2",
  type: "page-type/episode",
  slug: "elementary-s01e03",
  description:
    'Sherlock and Watson consult on a child abduction case involving a serial killer who is nicknamed "The Balloon Man," because he leaves a signature batch of balloons at each of his crime scenes.',
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/elementary-season-1"],
  position: 3,
  publishedAt: "2012-10-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64309",
      externalLink: "https://www.themoviedb.org/tv/1415/season/1/episode/3",
    },
  ],
  title: "Child Predator",
  episodeType: "standard",
  stillPath: "/pJG7Edkc94e9eAfJFqVNsZ29hcG.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
