import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theSarahJaneAdventuresS03e02 = {
  id: "01a18858-1d5d-7d22-b647-2a44e12303b4",
  type: "page-type/episode",
  slug: "the-sarah-jane-adventures-s03e02",
  description: "Luke, Clyde and Rani must fight their most fearsome enemy yet - Sarah Jane Smith.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/the-sarah-jane-adventures-season-3"],
  position: 2,
  publishedAt: "2009-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "12009",
      externalLink: "https://www.themoviedb.org/tv/203/season/3/episode/2",
    },
  ],
  title: "Prisoner of the Judoon (2)",
  episodeType: "standard",
  stillPath: "/8tryUcwX091BiEGDGr2rypfXyFr.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:47:18.491Z",
  updatedAt: "2026-10-29T15:47:18.491Z",
} as const satisfies Episode
