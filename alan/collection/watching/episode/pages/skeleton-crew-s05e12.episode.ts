import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS05e12 = {
  id: "01a18852-196c-726c-b488-1549b5d4eec4",
  type: "page-type/episode",
  slug: "skeleton-crew-s05e12",
  description:
    "Chaz, Anthony, and Gerard have a bad day while Hunter and Angie find themselves at an awkward dinner party.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-5"],
  position: 12,
  publishedAt: "2021-12-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380538",
      externalLink: "https://www.themoviedb.org/tv/225011/season/5/episode/12",
    },
  ],
  title: "Just Desserts, Part 2",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
