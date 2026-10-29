import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theSarahJaneAdventuresS04e12 = {
  id: "01a18858-1d5e-7015-9133-b2ae8f80529a",
  type: "page-type/episode",
  slug: "the-sarah-jane-adventures-s04e12",
  description: "Sarah Jane has gone for good, and a new regime begins at Bannerman Road!",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/the-sarah-jane-adventures-season-4"],
  position: 12,
  publishedAt: "2010-11-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "12026",
      externalLink: "https://www.themoviedb.org/tv/203/season/4/episode/12",
    },
  ],
  title: "Goodbye, Sarah Jane Smith (2)",
  episodeType: "finale",
  stillPath: "/yHxQDULWy18ipqX1oeah8bQhWoQ.jpg",
  voteAverage: 9.3,
  createdAt: "2026-10-29T15:47:18.491Z",
  updatedAt: "2026-10-29T15:47:18.491Z",
} as const satisfies Episode
