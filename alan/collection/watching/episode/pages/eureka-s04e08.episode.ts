import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS04e08 = {
  id: "01a18848-3733-73da-9520-a73d0b09af06",
  type: "page-type/episode",
  slug: "eureka-s04e08",
  description:
    "Eureka's citizens face the return of people from the past; Global Dynamics tests a new device.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-4"],
  position: 8,
  publishedAt: "2010-08-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335276",
      externalLink: "https://www.themoviedb.org/tv/4620/season/4/episode/8",
    },
  ],
  title: "The Ex-Files",
  episodeType: "standard",
  stillPath: "/pc2Jdsns8VifdF6fIPFUgXO6N7D.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
