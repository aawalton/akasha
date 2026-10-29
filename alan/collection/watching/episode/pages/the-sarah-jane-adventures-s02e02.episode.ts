import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theSarahJaneAdventuresS02e02 = {
  id: "01a18858-1d5c-7535-9224-2c320140e57d",
  type: "page-type/episode",
  slug: "the-sarah-jane-adventures-s02e02",
  description:
    "A lone surviving Sontaran from the failed conversion of Planet Earth wants revenge for the deaths of his comrades.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/the-sarah-jane-adventures-season-2"],
  position: 2,
  publishedAt: "2008-09-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "11987",
      externalLink: "https://www.themoviedb.org/tv/203/season/2/episode/2",
    },
  ],
  title: "The Last Sontaran (2)",
  episodeType: "standard",
  stillPath: "/jv1oKdltu26uiT4xT3kjEoHLqN6.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:47:18.491Z",
  updatedAt: "2026-10-29T15:47:18.491Z",
} as const satisfies Episode
