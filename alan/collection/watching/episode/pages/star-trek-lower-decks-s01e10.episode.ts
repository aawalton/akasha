import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekLowerDecksS01e10 = {
  id: "01a18852-f34a-7616-9d20-15e32f7037f1",
  type: "page-type/episode",
  slug: "star-trek-lower-decks-s01e10",
  description:
    "The USS Cerritos encounters a familiar enemy. Tendi helps a struggling recruit find her footing.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-lower-decks-season-1"],
  position: 10,
  publishedAt: "2020-10-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2457285",
      externalLink: "https://www.themoviedb.org/tv/85948/season/1/episode/10",
    },
  ],
  title: "No Small Parts",
  episodeType: "finale",
  stillPath: "/mjNqH0027pwphoZVJVa6ChqSoDt.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:41:40.042Z",
  updatedAt: "2026-10-29T15:41:40.042Z",
} as const satisfies Episode
