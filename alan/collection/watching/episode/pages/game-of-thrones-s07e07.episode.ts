import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS07e07 = {
  id: "01a18849-08b5-7d87-b2ce-5e8a0f847c91",
  type: "page-type/episode",
  slug: "game-of-thrones-s07e07",
  description: "Tyrion tries to save Westeros from itself. Sansa questions loyalties.",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-7"],
  position: 7,
  publishedAt: "2017-08-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1340528",
      externalLink: "https://www.themoviedb.org/tv/1399/season/7/episode/7",
    },
  ],
  title: "The Dragon and the Wolf",
  episodeType: "finale",
  stillPath: "/w4N4xxFrfjUyk7wE5hgcoAy0tDc.jpg",
  voteAverage: 8.562,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
