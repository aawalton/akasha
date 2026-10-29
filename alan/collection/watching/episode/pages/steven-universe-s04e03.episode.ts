import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS04e03 = {
  id: "01a18855-67ea-7cf6-b187-66731e80ba3e",
  type: "page-type/episode",
  slug: "steven-universe-s04e03",
  description: "Steven visits the library with Connie and uncovers a long lost book.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-4"],
  position: 3,
  publishedAt: "2016-08-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1214019",
      externalLink: "https://www.themoviedb.org/tv/61175/season/4/episode/3",
    },
  ],
  title: "Buddy's Book",
  episodeType: "standard",
  stillPath: "/63JRiavTwHoMxhXjzPeNlgNjnIS.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
