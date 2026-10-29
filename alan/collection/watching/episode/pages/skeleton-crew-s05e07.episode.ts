import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS05e07 = {
  id: "01a18852-196c-72a6-837e-ef8258eec583",
  type: "page-type/episode",
  slug: "skeleton-crew-s05e07",
  description:
    "Secrets and surprises circle Hunter, Anthony, and the Crew. Meanwhile, at the Dungeon apartment, ask not for whom the Bell tolls...Rhys knows.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-5"],
  position: 7,
  publishedAt: "2021-09-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380532",
      externalLink: "https://www.themoviedb.org/tv/225011/season/5/episode/7",
    },
  ],
  title: "With This Ring, Part 1",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
