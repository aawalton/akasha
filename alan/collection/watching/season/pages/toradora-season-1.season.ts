import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const toradoraSeason1 = {
  id: "01a183d9-26d9-744b-ad62-2df709201af3",
  type: "page-type/season",
  slug: "toradora-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/toradora"],
  position: 1,
  publishedAt: "2008-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "52421",
      externalLink: "https://www.themoviedb.org/tv/42916/season/1",
    },
  ],
  title: "Toradora! Season 1",
  posterPath: "/jgLSYTAgjQgwBqLEw1bgr8vNxeK.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-28T18:50:08.982Z",
  updatedAt: "2026-10-28T18:50:08.982Z",
} as const satisfies Season
