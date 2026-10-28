import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gurrenLagannS01e16 = {
  id: "01a183db-aafe-7658-be10-c06a22ed870d",
  type: "page-type/episode",
  slug: "gurren-lagann-s01e16",
  description: "A recap of the story's events from the previous episodes.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gurren-lagann-season-1"],
  position: 16,
  publishedAt: "2007-07-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "599476",
      externalLink: "https://www.themoviedb.org/tv/21729/season/1/episode/16",
    },
  ],
  title: "Compilation Episode",
  episodeType: "standard",
  stillPath: "/a6Q6Ry3swpvph6upHeUYOmh5KqM.jpg",
  voteAverage: 6,
  createdAt: "2026-10-28T18:52:53.885Z",
  updatedAt: "2026-10-28T18:52:53.885Z",
} as const satisfies Episode
