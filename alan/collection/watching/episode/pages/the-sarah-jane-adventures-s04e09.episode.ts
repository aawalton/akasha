import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theSarahJaneAdventuresS04e09 = {
  id: "01a18858-1d5e-7702-8fc9-5c1d2ee46d1a",
  type: "page-type/episode",
  slug: "the-sarah-jane-adventures-s04e09",
  description: "A harmless investigation turns into an epic quest across time and space.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/the-sarah-jane-adventures-season-4"],
  position: 9,
  publishedAt: "2010-11-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "12023",
      externalLink: "https://www.themoviedb.org/tv/203/season/4/episode/9",
    },
  ],
  title: "Lost in Time (1)",
  episodeType: "standard",
  stillPath: "/wzOqb0gr3fWhEf3cvhbzfzJszpx.jpg",
  voteAverage: 9,
  createdAt: "2026-10-29T15:47:18.491Z",
  updatedAt: "2026-10-29T15:47:18.491Z",
} as const satisfies Episode
