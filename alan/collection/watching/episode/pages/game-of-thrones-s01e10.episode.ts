import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS01e10 = {
  id: "01a18849-08b2-7691-8f12-e33422ef0d30",
  type: "page-type/episode",
  slug: "game-of-thrones-s01e10",
  description:
    "With Ned dead, Robb vows to get revenge on the Lannisters. Jon must officially decide if his place is with Robb or the Night's Watch. Daenerys says her final goodbye to Drogo.",
  ownLength: 53,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-1"],
  position: 10,
  publishedAt: "2011-06-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63065",
      externalLink: "https://www.themoviedb.org/tv/1399/season/1/episode/10",
    },
  ],
  title: "Fire and Blood",
  episodeType: "finale",
  stillPath: "/y1BXkhEqBQS3ewQeqqdHpjhTts0.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
