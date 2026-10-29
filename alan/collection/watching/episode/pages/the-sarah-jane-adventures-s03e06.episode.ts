import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theSarahJaneAdventuresS03e06 = {
  id: "01a18858-1d5d-730c-b0cc-5a29939b1559",
  type: "page-type/episode",
  slug: "the-sarah-jane-adventures-s03e06",
  description:
    "The Doctor arrives to join the battle, but is he too late to save both Sarah Jane and the Earth itself?",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/the-sarah-jane-adventures-season-3"],
  position: 6,
  publishedAt: "2009-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "12008",
      externalLink: "https://www.themoviedb.org/tv/203/season/3/episode/6",
    },
  ],
  title: "The Wedding of Sarah Jane Smith (2)",
  episodeType: "standard",
  stillPath: "/vQ6DZphXZJ4miaf7ILtvC3RtJtM.jpg",
  voteAverage: 9.5,
  createdAt: "2026-10-29T15:47:18.491Z",
  updatedAt: "2026-10-29T15:47:18.491Z",
} as const satisfies Episode
