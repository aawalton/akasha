import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const inhumansS01e04 = {
  id: "01a18849-ba0e-7d4d-af61-dee5ecf1011f",
  type: "page-type/episode",
  slug: "inhumans-s01e04",
  description:
    "Nina has been raised to kill. One night, at the hotel bar, she listens to her next target's newest song.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-inhumans-season-1"],
  position: 4,
  publishedAt: "2025-07-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6372132",
      externalLink: "https://www.themoviedb.org/tv/276288/season/1/episode/4",
    },
  ],
  title: "Corpse Reviver",
  episodeType: "standard",
  stillPath: "/a9IMzY6Z7BzeAIeEHvxldGw1bEB.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:31:35.566Z",
  updatedAt: "2026-10-29T15:31:35.566Z",
} as const satisfies Episode
