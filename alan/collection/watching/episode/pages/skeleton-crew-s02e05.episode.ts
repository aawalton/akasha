import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS02e05 = {
  id: "01a18852-196a-7013-867e-0bcaaeb0f863",
  type: "page-type/episode",
  slug: "skeleton-crew-s02e05",
  description:
    "Veronica has organized a fund raiser for Glenn's retirement home, and everyone begrudgingly attends to show their support.",
  ownLength: 29,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-2"],
  position: 5,
  publishedAt: "2016-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380462",
      externalLink: "https://www.themoviedb.org/tv/225011/season/2/episode/5",
    },
  ],
  title: "'Til Death",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
