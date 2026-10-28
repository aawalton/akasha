import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const haikyuS01e01 = {
  id: "01a183d2-cc45-7a55-bbc3-142fe3a7cc7c",
  type: "page-type/episode",
  slug: "haikyu-s01e01",
  description:
    "Shouyou Hinata is enamored with volleyball; he is in the 3rd year of middle-school, and will not be discouraged by the fact that he has no teammates to play with. He finally scrapes together a team to enter his first and last official tournament.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/haikyu-season-1"],
  position: 1,
  publishedAt: "2014-04-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "986240",
      externalLink: "https://www.themoviedb.org/tv/60863/season/1/episode/1",
    },
  ],
  title: "The End & The Beginning",
  episodeType: "standard",
  stillPath: "/uXQBduC3R6xRrmJY0QpR7UqHqtQ.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:43:12.581Z",
  updatedAt: "2026-10-28T18:43:12.581Z",
} as const satisfies Episode
