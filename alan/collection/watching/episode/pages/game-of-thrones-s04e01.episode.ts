import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS04e01 = {
  id: "01a18849-08b3-7f91-97ef-d79383dd9596",
  type: "page-type/episode",
  slug: "game-of-thrones-s04e01",
  description:
    "King's Landing prepares for a royal wedding; Dany finds the way to Meereen; the Night's Watch braces for a new threat.",
  ownLength: 59,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-4"],
  position: 1,
  publishedAt: "2014-04-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "973190",
      externalLink: "https://www.themoviedb.org/tv/1399/season/4/episode/1",
    },
  ],
  title: "Two Swords",
  episodeType: "standard",
  stillPath: "/nwtWHSlKnXS1sRLuzzwEmIuXjj8.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
