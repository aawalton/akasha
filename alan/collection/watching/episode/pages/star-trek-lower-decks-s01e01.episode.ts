import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekLowerDecksS01e01 = {
  id: "01a18852-f34a-7896-8801-42c7dd19f3aa",
  type: "page-type/episode",
  slug: "star-trek-lower-decks-s01e01",
  description:
    "Ensign Tendi has her first day of work on Starfleet's USS Cerritos, where she meets fellow support crew members. Boimler is tasked with a secret special assignment. Rutherford attempts to keep his dating life intact while a disaster strikes the ship.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-lower-decks-season-1"],
  position: 1,
  publishedAt: "2020-08-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1675691",
      externalLink: "https://www.themoviedb.org/tv/85948/season/1/episode/1",
    },
  ],
  title: "Second Contact",
  episodeType: "standard",
  stillPath: "/AvZAQtOAO8n9zj5LMKpkF0ZiwWM.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:41:40.042Z",
  updatedAt: "2026-10-29T15:41:40.042Z",
} as const satisfies Episode
