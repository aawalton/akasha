import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS04e11 = {
  id: "01a18852-196c-79f2-8efe-ec092c1d6eb1",
  type: "page-type/episode",
  slug: "skeleton-crew-s04e11",
  description:
    "In Part Two of the Season Four Finale, our characters converge to see Veronica's dreams come true.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-4"],
  position: 11,
  publishedAt: "2019-02-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380522",
      externalLink: "https://www.themoviedb.org/tv/225011/season/4/episode/11",
    },
  ],
  title: "Daffodils, Part 2",
  episodeType: "finale",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
