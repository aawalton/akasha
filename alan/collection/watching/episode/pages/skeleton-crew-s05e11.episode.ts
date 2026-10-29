import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS05e11 = {
  id: "01a18852-196c-7f16-b541-33ba47fe6f42",
  type: "page-type/episode",
  slug: "skeleton-crew-s05e11",
  description: "David stays busy in prison while the MoneyShot$ team stumble through their days.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-5"],
  position: 11,
  publishedAt: "2021-12-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380537",
      externalLink: "https://www.themoviedb.org/tv/225011/season/5/episode/11",
    },
  ],
  title: "Just Desserts, Part 1",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
