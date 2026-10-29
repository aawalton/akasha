import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theWheelOfTimeS02e01 = {
  id: "01a18858-e123-72c7-a81e-fa6ed917e36f",
  type: "page-type/episode",
  slug: "the-wheel-of-time-s02e01",
  description:
    "Moiraine, Lan, Nynaeve, Egwene, Perrin, and Mat find themselves more alone than ever.",
  ownLength: 67,
  ownProgress: 0,
  partOfCollections: ["season/the-wheel-of-time-season-2"],
  position: 1,
  publishedAt: "2023-08-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4467609",
      externalLink: "https://www.themoviedb.org/tv/71914/season/2/episode/1",
    },
  ],
  title: "A Taste of Solitude",
  episodeType: "standard",
  stillPath: "/2f42fl7AhRSQ4GFtFK5Rj4YVFAg.jpg",
  voteAverage: 5.4,
  createdAt: "2026-10-29T15:48:08.610Z",
  updatedAt: "2026-10-29T15:48:08.610Z",
} as const satisfies Episode
