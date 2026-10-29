import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theRookieS01e01 = {
  id: "01a18885-4801-7600-93bf-9627dbd97e49",
  type: "page-type/episode",
  slug: "the-rookie-s01e01",
  description:
    "Starting over isn't easy, especially for small-town guy John Nolan who, after a life-altering incident, is pursuing his dream of being a police officer. As the force's oldest rookie, he’s met with skepticism from some higher-ups who see him as just a walking midlife crisis. Throw in a workplace romance, a hostage situation, and some tough love from their new training officers, and the latest Los Angeles police rookie class has an uphill battle ahead of them.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-rookie-season-1"],
  position: 1,
  publishedAt: "2018-10-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1493929",
      externalLink: "https://www.themoviedb.org/tv/79744/season/1/episode/1",
    },
  ],
  title: "Pilot",
  episodeType: "standard",
  stillPath: "/ckcUXu0ItVztz0Ekc7QZcdDCw4h.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T16:36:38.529Z",
  updatedAt: "2026-10-29T16:36:38.529Z",
} as const satisfies Episode
