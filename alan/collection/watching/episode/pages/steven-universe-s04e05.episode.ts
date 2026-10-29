import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS04e05 = {
  id: "01a18855-67ea-7c1b-a805-e7deb0eee427",
  type: "page-type/episode",
  slug: "steven-universe-s04e05",
  description: "Steven tells people's fortunes at Funland.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-4"],
  position: 5,
  publishedAt: "2016-09-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1214021",
      externalLink: "https://www.themoviedb.org/tv/61175/season/4/episode/5",
    },
  ],
  title: "Future Boy Zoltron",
  episodeType: "standard",
  stillPath: "/etYasICFg0tx1Z9i8SjzZ1ahjon.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
