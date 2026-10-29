import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS01e08 = {
  id: "01a18855-67e4-766b-ac05-f5c29b1eeb8c",
  type: "page-type/episode",
  slug: "steven-universe-s01e08",
  description:
    "While navigating out of an ancient Gem maze, Steven tries to prove himself worthy to Garnet by being serious.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-1"],
  position: 8,
  publishedAt: "2014-01-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1003601",
      externalLink: "https://www.themoviedb.org/tv/61175/season/1/episode/8",
    },
  ],
  title: "Serious Steven",
  episodeType: "standard",
  stillPath: "/98LYWo9e37LzHvuULukHW9FFk2k.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
