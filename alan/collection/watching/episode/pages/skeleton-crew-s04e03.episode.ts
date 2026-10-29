import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS04e03 = {
  id: "01a18852-196b-7ddc-bf47-1996fd959752",
  type: "page-type/episode",
  slug: "skeleton-crew-s04e03",
  description:
    "An unexpected death brings everyone together to mourn in their own way and pay homage to the dearly departed.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-4"],
  position: 3,
  publishedAt: "2018-12-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380507",
      externalLink: "https://www.themoviedb.org/tv/225011/season/4/episode/3",
    },
  ],
  title: "Chrysalis",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
