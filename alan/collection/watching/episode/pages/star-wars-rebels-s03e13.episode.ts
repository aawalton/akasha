import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS03e13 = {
  id: "01a18853-ddfe-7759-b9ff-5ac31931b595",
  type: "page-type/episode",
  slug: "star-wars-rebels-s03e13",
  description:
    "Zeb and Chopper bring a damaged droid found in the Atollon wilderness back to base, only to discover that the droid is a new Imperial probe programmed to spy on and destroy rebels.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-3"],
  position: 13,
  publishedAt: "2017-01-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1253953",
      externalLink: "https://www.themoviedb.org/tv/60554/season/3/episode/13",
    },
  ],
  title: "Warhead",
  episodeType: "standard",
  stillPath: "/kj0bp7p56DUgHWyr59btmx7DMD3.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
