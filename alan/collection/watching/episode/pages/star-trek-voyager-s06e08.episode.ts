import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e08 = {
  id: "01a18853-ac90-741f-b606-dbeddd5fd909",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e08",
  description: "Stardate: Unknown. Voyager searches for a long-lost Mars spacecraft.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 8,
  publishedAt: "1999-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113304",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/8",
    },
  ],
  title: "One Small Step",
  episodeType: "standard",
  stillPath: "/pFcuRYU92Fx9NHwRtri2cg1pxgW.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
