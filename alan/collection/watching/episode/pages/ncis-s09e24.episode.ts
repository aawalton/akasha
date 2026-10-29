import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e24 = {
  id: "01a1884b-ef6f-740a-9328-021bd193cffb",
  type: "page-type/episode",
  slug: "ncis-s09e24",
  description:
    "Terrorism shakes the foundations of the Navy and NCIS to such an extent that Gibbs and the team face surprises that will devastate them.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 24,
  publishedAt: "2012-05-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334613",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/24",
    },
  ],
  title: "Till Death Do Us Part",
  episodeType: "finale",
  stillPath: "/sB1mmYSsC8LTgqr8bc8RCFNI0dQ.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
