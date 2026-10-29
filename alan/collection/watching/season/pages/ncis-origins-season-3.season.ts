import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisOriginsSeason3 = {
  id: "01a1884b-534b-7a15-a67b-7db6cc8cd569",
  type: "page-type/season",
  slug: "ncis-origins-season-3",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/ncis-origins"],
  position: 3,
  publishedAt: "2026-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "532132",
      externalLink: "https://www.themoviedb.org/tv/243006/season/3",
    },
  ],
  title: "NCIS: Origins Season 3",
  posterPath: "/x7QvICqe2gRJiroqxyGdpFZ5hkQ.jpg",
  voteAverage: 9.3,
  createdAt: "2026-10-29T15:33:20.328Z",
  updatedAt: "2026-10-29T15:33:20.328Z",
} as const satisfies Season
