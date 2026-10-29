import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS03e01 = {
  id: "01a18855-67e8-72f4-af26-ad8d85ee553f",
  type: "page-type/episode",
  slug: "steven-universe-s03e01",
  description: "Steven discovers what happened to his sentient watermelons.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-3"],
  position: 1,
  publishedAt: "2016-05-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1191883",
      externalLink: "https://www.themoviedb.org/tv/61175/season/3/episode/1",
    },
  ],
  title: "Super Watermelon Island",
  episodeType: "standard",
  stillPath: "/1ud237JVg7v7Y6fk469BURFlNwW.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
