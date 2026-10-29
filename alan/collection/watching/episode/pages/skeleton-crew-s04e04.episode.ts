import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS04e04 = {
  id: "01a18852-196b-7c5c-a907-1a8b7b801746",
  type: "page-type/episode",
  slug: "skeleton-crew-s04e04",
  description: "Father Anglicus goes on an unexpected journey with an unlikely guide.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-4"],
  position: 4,
  publishedAt: "2019-01-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380508",
      externalLink: "https://www.themoviedb.org/tv/225011/season/4/episode/4",
    },
  ],
  title: "It Could Be a Wonderful Life",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
