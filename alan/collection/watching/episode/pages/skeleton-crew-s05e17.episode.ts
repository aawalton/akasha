import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS05e17 = {
  id: "01a18852-196c-7858-95cc-a0712fb562a1",
  type: "page-type/episode",
  slug: "skeleton-crew-s05e17",
  description:
    "Hunter, Anthony, and their friends face the fallout of the unexpected third party they found in their bed...",
  ownLength: 27,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-5"],
  position: 17,
  publishedAt: "2022-03-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4457901",
      externalLink: "https://www.themoviedb.org/tv/225011/season/5/episode/17",
    },
  ],
  title: "Ménage à Wha-?, Part 1",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
