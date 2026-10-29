import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisSydneySeason3 = {
  id: "01a1884b-6703-7c3b-9ed2-e38ef4dee8f5",
  type: "page-type/season",
  slug: "ncis-sydney-season-3",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/ncis-sydney"],
  position: 3,
  publishedAt: "2025-10-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "470050",
      externalLink: "https://www.themoviedb.org/tv/157950/season/3",
    },
  ],
  title: "NCIS: Sydney Season 3",
  posterPath: "/quatwgWSEphVptXv53sZKDF6nxx.jpg",
  voteAverage: 4.3,
  createdAt: "2026-10-29T15:33:25.376Z",
  updatedAt: "2026-10-29T15:33:25.376Z",
} as const satisfies Season
