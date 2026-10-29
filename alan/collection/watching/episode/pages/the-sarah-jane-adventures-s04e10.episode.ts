import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theSarahJaneAdventuresS04e10 = {
  id: "01a18858-1d5e-7e1c-84bf-46510b2b2048",
  type: "page-type/episode",
  slug: "the-sarah-jane-adventures-s04e10",
  description: "Sarah Jane, Clyde and Rani fight across the centuries to be reunited.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/the-sarah-jane-adventures-season-4"],
  position: 10,
  publishedAt: "2010-11-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "12024",
      externalLink: "https://www.themoviedb.org/tv/203/season/4/episode/10",
    },
  ],
  title: "Lost in Time (2)",
  episodeType: "standard",
  stillPath: "/eZY1tgvTgLEOkmLplMwWmnDPIlY.jpg",
  voteAverage: 9.3,
  createdAt: "2026-10-29T15:47:18.491Z",
  updatedAt: "2026-10-29T15:47:18.491Z",
} as const satisfies Episode
