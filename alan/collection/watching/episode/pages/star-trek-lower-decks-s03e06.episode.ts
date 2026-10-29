import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekLowerDecksS03e06 = {
  id: "01a18852-f34b-7697-8e61-5eb9597e51fc",
  type: "page-type/episode",
  slug: "star-trek-lower-decks-s03e06",
  description: "The Cerritos crew unexpectedly spends a day on Deep Space Nine.",
  ownLength: 28,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-lower-decks-season-3"],
  position: 6,
  publishedAt: "2022-09-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3970406",
      externalLink: "https://www.themoviedb.org/tv/85948/season/3/episode/6",
    },
  ],
  title: "Hear All, Trust Nothing",
  episodeType: "standard",
  stillPath: "/AealHSXAmWdGDQwEL6iUOdA2VKe.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:41:40.042Z",
  updatedAt: "2026-10-29T15:41:40.042Z",
} as const satisfies Episode
