import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S05e03 = {
  id: "01a18843-5083-7e18-824b-188a5d6ad1d3",
  type: "page-type/episode",
  slug: "babylon-5-s05e03",
  description:
    "A small world plagued by raiders begs the alliance for help. Garibaldi tries forming an intelligence unit of telepaths.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-wheel-of-fire"],
  position: 3,
  publishedAt: "1998-02-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235901",
      externalLink: "https://www.themoviedb.org/tv/3137/season/5/episode/3",
    },
  ],
  title: "The Paragon of Animals",
  episodeType: "standard",
  stillPath: "/z5gjvPjafRjOiMvngL4XntV2zUY.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
