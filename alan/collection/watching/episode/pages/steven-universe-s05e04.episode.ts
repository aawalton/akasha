import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS05e04 = {
  id: "01a18855-67eb-7c14-9edf-506736c8d3aa",
  type: "page-type/episode",
  slug: "steven-universe-s05e04",
  description:
    "After Steven brings Lars back to life with his healing powers, he discovers that Lars now shares the same powers as Lion.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-5"],
  position: 4,
  publishedAt: "2017-05-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1313217",
      externalLink: "https://www.themoviedb.org/tv/61175/season/5/episode/4",
    },
  ],
  title: "Lars' Head",
  episodeType: "standard",
  stillPath: "/xVcKk1MT8v5uGJPOgS6MRkbFp1R.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
