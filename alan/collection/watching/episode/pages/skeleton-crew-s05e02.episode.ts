import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS05e02 = {
  id: "01a18852-196c-796c-8a19-f27ff37905b9",
  type: "page-type/episode",
  slug: "skeleton-crew-s05e02",
  description:
    "Hunter, Anthony, and the Crew work hard to pull off Piper's Hell House, but it's Piper who has a true come to Jesus moment before night's over.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-5"],
  position: 2,
  publishedAt: "2021-08-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380526",
      externalLink: "https://www.themoviedb.org/tv/225011/season/5/episode/2",
    },
  ],
  title: "The House That Jesus Built, Part 2",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
