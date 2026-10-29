import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS22e08 = {
  id: "01a1884b-ef84-733f-9ebd-3b4947e7e06d",
  type: "page-type/episode",
  slug: "ncis-s22e08",
  description: "NCIS investigates a murder related to a car that begins driving on its own.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-22"],
  position: 8,
  publishedAt: "2024-12-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5813667",
      externalLink: "https://www.themoviedb.org/tv/4614/season/22/episode/8",
    },
  ],
  title: "Out of Control",
  episodeType: "standard",
  stillPath: "/bPVk6pEpqwXE59SDS34jekDxLJk.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
