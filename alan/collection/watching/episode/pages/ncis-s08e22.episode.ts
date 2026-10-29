import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e22 = {
  id: "01a1884b-ef6d-7d11-a857-272a5d071cdd",
  type: "page-type/episode",
  slug: "ncis-s08e22",
  description:
    "After Tony's ex-partner, Danny Price, appears to be the Port-to-Port Killer's latest victim, he revisits his days as a detective in Baltimore, including his first encounter with Gibbs.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 22,
  publishedAt: "2011-05-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334589",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/22",
    },
  ],
  title: "Baltimore",
  episodeType: "standard",
  stillPath: "/oi2BtlvMfntuw2hNLXWSmO70tvZ.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
