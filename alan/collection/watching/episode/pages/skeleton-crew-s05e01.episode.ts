import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS05e01 = {
  id: "01a18852-196c-78d5-9fa2-6f7bab50410d",
  type: "page-type/episode",
  slug: "skeleton-crew-s05e01",
  description:
    "Hunter and Anthony find themselves redefining their relationship after their unexpected reunion, while the MoneyShot$ crew prepare to celebrate Halloween at The House that Jesus Built...",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-5"],
  position: 1,
  publishedAt: "2021-07-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380525",
      externalLink: "https://www.themoviedb.org/tv/225011/season/5/episode/1",
    },
  ],
  title: "The House That Jesus Built, Part 1",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
