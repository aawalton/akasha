import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theSarahJaneAdventuresS03e01 = {
  id: "01a18858-1d5d-75cf-aa10-2dcb5697b64d",
  type: "page-type/episode",
  slug: "the-sarah-jane-adventures-s03e01",
  description:
    "Sarah Jane and the gang face the most dangerous day of their lives, as the rhino-like Judoon return. When prisoner Androvax the Destroyer crash-lands on Earth, a Veil is set free and starts to turn Earth's technology against itself.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/the-sarah-jane-adventures-season-3"],
  position: 1,
  publishedAt: "2009-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "12010",
      externalLink: "https://www.themoviedb.org/tv/203/season/3/episode/1",
    },
  ],
  title: "Prisoner of the Judoon (1)",
  episodeType: "standard",
  stillPath: "/rnJdVtIF1K1DQyrS7dTEI9aiyQi.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:47:18.491Z",
  updatedAt: "2026-10-29T15:47:18.491Z",
} as const satisfies Episode
