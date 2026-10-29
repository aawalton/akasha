import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const onePieceS01e21 = {
  id: "01a18884-52e5-756d-a96c-31a754532427",
  type: "page-type/episode",
  slug: "one-piece-s01e21",
  description:
    "Sanji, a cook at the Baratie, helps a starving pirate named Gin. Luffy begins his job as a waiter to pay for the damage he did to the Baratie, and tries to convince Sanji to join his crew.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/one-piece-season-1"],
  position: 21,
  publishedAt: "2000-04-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1152991",
      externalLink: "https://www.themoviedb.org/tv/37854/season/1/episode/21",
    },
  ],
  title: "Unwelcome Customer! Sanji's Food and Ghin's Debt!",
  episodeType: "standard",
  stillPath: "/7a0bQdtRMeczMBFYXbTMkjnxFql.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:35:35.779Z",
  updatedAt: "2026-10-29T16:35:35.779Z",
} as const satisfies Episode
