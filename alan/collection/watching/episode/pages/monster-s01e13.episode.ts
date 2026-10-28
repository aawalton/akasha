import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e13 = {
  id: "01a183d8-0265-785e-8c02-fcffe016e66f",
  type: "page-type/episode",
  slug: "monster-s01e13",
  description:
    "In a small village, Dr. Schumann worries over the health of his sick but stubborn old friend, Petra.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 13,
  publishedAt: "2004-06-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749527",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/13",
    },
  ],
  title: "Petra and Schumann",
  episodeType: "standard",
  stillPath: "/hlKdVyUkvKg0GP565domhD4bAZk.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
