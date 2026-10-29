import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS02e08 = {
  id: "01a18849-08b2-7b0f-baa4-a0f386dfa9e6",
  type: "page-type/episode",
  slug: "game-of-thrones-s02e08",
  description:
    "Theon holds down the fort; Arya calls in her debt with Jaqen; Robb is betrayed; Stannis and Davos approach their destination.",
  ownLength: 54,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-2"],
  position: 8,
  publishedAt: "2012-05-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63074",
      externalLink: "https://www.themoviedb.org/tv/1399/season/2/episode/8",
    },
  ],
  title: "The Prince of Winterfell",
  episodeType: "standard",
  stillPath: "/4W90HbZcVG54m8HoxaZmXc8rzjy.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
