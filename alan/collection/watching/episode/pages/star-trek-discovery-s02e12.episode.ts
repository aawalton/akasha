import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS02e12 = {
  id: "01a18852-a9f6-7c39-8503-3592501473ce",
  type: "page-type/episode",
  slug: "star-trek-discovery-s02e12",
  description:
    "A fourth signal leads the U.S.S. Discovery to a world where Pike is forced to make a life-changing choice. Burnham and Spock investigate a Section 31 ship gone rogue, leading to a discovery with catastrophic consequences.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-2"],
  position: 12,
  publishedAt: "2019-04-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1744340",
      externalLink: "https://www.themoviedb.org/tv/67198/season/2/episode/12",
    },
  ],
  title: "Through the Valley of Shadows",
  episodeType: "standard",
  stillPath: "/dSt1LPNujIxf46q44oeMxqcZxs6.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
