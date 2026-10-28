import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const nanaS01e02 = {
  id: "01a183d5-6775-7bd6-8df9-c19047a4377f",
  type: "page-type/episode",
  slug: "nana-s01e02",
  description:
    "Komatsu Nana's past is revealed, from graduating high school to the time when her and Shoji met in Community College.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/nana-season-1"],
  position: 2,
  publishedAt: "2006-04-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "939463",
      externalLink: "https://www.themoviedb.org/tv/56568/season/1/episode/2",
    },
  ],
  title: "Love? Friendship? Nana and Shoji",
  episodeType: "standard",
  stillPath: "/qGdzPOIsipbB8pFvvz8YJiklS4Y.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:46:03.381Z",
  updatedAt: "2026-10-28T18:46:03.381Z",
} as const satisfies Episode
