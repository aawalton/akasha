import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS01e01 = {
  id: "01a18852-1969-7df7-ac7f-e5c1e4ec1fe9",
  type: "page-type/episode",
  slug: "skeleton-crew-s01e01",
  description:
    "Six family members gather for an evening of Halloween merriment. But things don't go as expected...",
  ownLength: 37,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-skeleton-crew-season-1"],
  position: 1,
  publishedAt: "2015-10-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380301",
      externalLink: "https://www.themoviedb.org/tv/225011/season/1/episode/1",
    },
  ],
  title: "Bone Collecting",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
