import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS04e05 = {
  id: "01a18852-196b-7be8-80c2-03a6c3631437",
  type: "page-type/episode",
  slug: "skeleton-crew-s04e05",
  description:
    "It's Christmas, but instead of bringing everyone together, no one could be further apart.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-4"],
  position: 5,
  publishedAt: "2019-01-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380509",
      externalLink: "https://www.themoviedb.org/tv/225011/season/4/episode/5",
    },
  ],
  title: "The Withered Tree",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
