import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS05e04 = {
  id: "01a18852-196c-7d30-a4d1-e2a18f83a37c",
  type: "page-type/episode",
  slug: "skeleton-crew-s05e04",
  description: "It's time to honor Piper's memory, as only the Crew at MoneyShot$ knows how.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-5"],
  position: 4,
  publishedAt: "2021-08-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380529",
      externalLink: "https://www.themoviedb.org/tv/225011/season/5/episode/4",
    },
  ],
  title: "Spitfire, Part 2",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
