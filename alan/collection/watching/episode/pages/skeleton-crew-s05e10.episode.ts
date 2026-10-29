import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS05e10 = {
  id: "01a18852-196c-7eda-86c9-14448190c874",
  type: "page-type/episode",
  slug: "skeleton-crew-s05e10",
  description: "A day in the life of Gerard Medrano--one which will end with him forever changed.",
  ownLength: 27,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-5"],
  position: 10,
  publishedAt: "2021-11-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380536",
      externalLink: "https://www.themoviedb.org/tv/225011/season/5/episode/10",
    },
  ],
  title: "The Thirteen Ghosts of Gerard Medrano, Part 2",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
