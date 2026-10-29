import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS05e06 = {
  id: "01a1884b-ef67-75d6-b1eb-b2328e02d068",
  type: "page-type/episode",
  slug: "ncis-s05e06",
  description:
    "While investigating a mysterious death on a top-secret Naval research ship at sea, the NCIS team board the abandoned ship and find a deadly secret that may cost them their lives.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-5"],
  position: 6,
  publishedAt: "2007-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334459",
      externalLink: "https://www.themoviedb.org/tv/4614/season/5/episode/6",
    },
  ],
  title: "Chimera",
  episodeType: "standard",
  stillPath: "/dCjWAwpEvVWN21C7x0LRIpRIeiF.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
