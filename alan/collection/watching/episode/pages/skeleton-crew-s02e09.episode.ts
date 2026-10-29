import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS02e09 = {
  id: "01a18852-196a-7241-85a6-caad2e1c4719",
  type: "page-type/episode",
  slug: "skeleton-crew-s02e09",
  description:
    "It's almost time for Appolina's wedding. But first up: the bachelorette party. And no bachelorette party is complete without a male dancer.",
  ownLength: 27,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-2"],
  position: 9,
  publishedAt: "2017-01-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380466",
      externalLink: "https://www.themoviedb.org/tv/225011/season/2/episode/9",
    },
  ],
  title: "Out of the Closet",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
