import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS05e05 = {
  id: "01a18852-196c-76d4-a063-5f0b32009512",
  type: "page-type/episode",
  slug: "skeleton-crew-s05e05",
  description:
    "Movie nights with Anthony leave much to be desired for Hunter, while Polly deals with some unexpected news. Drake and Angie learn new truths about each other, and Gerard meets a man.",
  ownLength: 28,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-5"],
  position: 5,
  publishedAt: "2021-08-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380530",
      externalLink: "https://www.themoviedb.org/tv/225011/season/5/episode/5",
    },
  ],
  title: "The Pity Party, Part 1",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
