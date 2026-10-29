import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theWheelOfTimeOriginsS01e01 = {
  id: "01a18858-d16d-7b42-aa80-2f3be5e23f10",
  type: "page-type/episode",
  slug: "the-wheel-of-time-origins-s01e01",
  description:
    "See how the male side of the One Power was poisoned by the Dark One and brought about the destruction of the world.",
  ownLength: 4,
  ownProgress: 0,
  partOfCollections: ["season/the-wheel-of-time-origins-season-1"],
  position: 1,
  publishedAt: "2021-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6744435",
      externalLink: "https://www.themoviedb.org/tv/307623/season/1/episode/1",
    },
  ],
  title: "The Breaking of the World",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:48:04.589Z",
  updatedAt: "2026-10-29T15:48:04.589Z",
} as const satisfies Episode
