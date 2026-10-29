import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS04e17 = {
  id: "01a18848-3734-7c51-b543-ae35dc1ff5f9",
  type: "page-type/episode",
  slug: "eureka-s04e17",
  description:
    "The Eureka atmosphere becomes toxic when Department of Defense auditor comes to assess the team's relationships.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-4"],
  position: 17,
  publishedAt: "2011-08-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335287",
      externalLink: "https://www.themoviedb.org/tv/4620/season/4/episode/17",
    },
  ],
  title: "Clash of the Titans",
  episodeType: "standard",
  stillPath: "/cCD7MWBViHrUXLUqNafDn0fvbb3.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
