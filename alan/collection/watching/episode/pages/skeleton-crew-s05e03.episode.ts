import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS05e03 = {
  id: "01a18852-196c-7ae6-92e4-a85809d81c77",
  type: "page-type/episode",
  slug: "skeleton-crew-s05e03",
  description:
    "Anthony is off to Hollywood, and Hunter is left behind to deal with the fallout from the tragic events following the Hell House.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-5"],
  position: 3,
  publishedAt: "2021-08-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380527",
      externalLink: "https://www.themoviedb.org/tv/225011/season/5/episode/3",
    },
  ],
  title: "Spitfire, Part 1",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
