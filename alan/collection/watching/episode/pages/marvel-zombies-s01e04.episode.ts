import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const marvelZombiesS01e04 = {
  id: "01a1884a-52df-7639-acdf-66ebb133aae7",
  type: "page-type/episode",
  slug: "marvel-zombies-s01e04",
  description: "A bloody end.",
  ownLength: 32,
  ownProgress: 0,
  partOfCollections: ["season/marvel-zombies-miniseries"],
  position: 4,
  publishedAt: "2025-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5759648",
      externalLink: "https://www.themoviedb.org/tv/138505/season/1/episode/4",
    },
  ],
  title: "Episode 4",
  episodeType: "finale",
  stillPath: "/qNQjFDAeqMDA3ISOUBYikkaVEI0.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:32:14.686Z",
  updatedAt: "2026-10-29T15:32:14.686Z",
} as const satisfies Episode
