import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS04e06 = {
  id: "01a18852-196b-7924-b47a-04e184f38234",
  type: "page-type/episode",
  slug: "skeleton-crew-s04e06",
  description:
    "It's a story of new beginnings and first times for the folk at MoneyShot$. But not every starting point leads to a happy ending.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-4"],
  position: 6,
  publishedAt: "2019-01-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380510",
      externalLink: "https://www.themoviedb.org/tv/225011/season/4/episode/6",
    },
  ],
  title: "Shattered",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
