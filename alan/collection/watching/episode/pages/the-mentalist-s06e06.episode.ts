import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS06e06 = {
  id: "01a18880-75eb-7b26-8d6f-296aa3937195",
  type: "page-type/episode",
  slug: "the-mentalist-s06e06",
  description:
    "With the final clue in hand, Jane attempts to gather the remaining Red John suspects in one place in hopes of finally revealing his identity.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-mentalist-season-6"],
  position: 6,
  publishedAt: "2013-11-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367814",
      externalLink: "https://www.themoviedb.org/tv/5920/season/6/episode/6",
    },
  ],
  title: "Fire and Brimstone",
  episodeType: "standard",
  stillPath: "/9ufkdeNK0ZlwTN7EAX8YI8333Ow.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
