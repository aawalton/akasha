import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const inhumansS01e02 = {
  id: "01a18849-ba0e-7b52-81af-ae148bedbadc",
  type: "page-type/episode",
  slug: "inhumans-s01e02",
  description:
    "Kase is a hitman who stays at the hotel when he escapes the life others believe he leads.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-inhumans-season-1"],
  position: 2,
  publishedAt: "2025-07-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6358809",
      externalLink: "https://www.themoviedb.org/tv/276288/season/1/episode/2",
    },
  ],
  title: "Dying Service 1",
  episodeType: "standard",
  stillPath: "/uX9YplPnd4p0MIAG6saHe3XnT5U.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:31:35.566Z",
  updatedAt: "2026-10-29T15:31:35.566Z",
} as const satisfies Episode
