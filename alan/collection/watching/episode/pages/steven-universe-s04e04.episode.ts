import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS04e04 = {
  id: "01a18855-67ea-7bcb-ac06-b08378f8e1b2",
  type: "page-type/episode",
  slug: "steven-universe-s04e04",
  description: "Steven and Connie learn to focus better.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-4"],
  position: 4,
  publishedAt: "2016-08-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1214020",
      externalLink: "https://www.themoviedb.org/tv/61175/season/4/episode/4",
    },
  ],
  title: "Mindful Education",
  episodeType: "standard",
  stillPath: "/vmQaybfWjxdT40gc7GLRSrQ3iHr.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
