import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS05e09 = {
  id: "01a18852-196c-7723-b3b8-6564e869536f",
  type: "page-type/episode",
  slug: "skeleton-crew-s05e09",
  description:
    "As Gerard opens up to Edward, the rest of the MoneyShot$ team reflects on recent events.",
  ownLength: 27,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-5"],
  position: 9,
  publishedAt: "2021-11-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380534",
      externalLink: "https://www.themoviedb.org/tv/225011/season/5/episode/9",
    },
  ],
  title: "The Thirteen Ghosts of Gerard Medrano, Part 1",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
