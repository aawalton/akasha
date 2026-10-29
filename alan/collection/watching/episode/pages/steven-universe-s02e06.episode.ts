import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS02e06 = {
  id: "01a18855-67e7-7fe7-9369-c2f20db5f6c3",
  type: "page-type/episode",
  slug: "steven-universe-s02e06",
  description: "Steven and Buck make T-shirts.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-2"],
  position: 6,
  publishedAt: "2015-04-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1921004",
      externalLink: "https://www.themoviedb.org/tv/61175/season/2/episode/6",
    },
  ],
  title: "Shirt Club",
  episodeType: "standard",
  stillPath: "/zOTXStPWZ8HnaeBdITKScun2Se7.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
