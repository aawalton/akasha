import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekLowerDecksS03e10 = {
  id: "01a18852-f34b-7a41-916a-5db47c46468b",
  type: "page-type/episode",
  slug: "star-trek-lower-decks-s03e10",
  description: "The Cerritos crew must prove their worth in a mission race.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-lower-decks-season-3"],
  position: 10,
  publishedAt: "2022-10-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4018295",
      externalLink: "https://www.themoviedb.org/tv/85948/season/3/episode/10",
    },
  ],
  title: "The Stars at Night",
  episodeType: "finale",
  stillPath: "/1uOb8Z3wNN2U7pztlIk85meP9mv.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:41:40.042Z",
  updatedAt: "2026-10-29T15:41:40.042Z",
} as const satisfies Episode
