import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const rockapellaMotownMore = {
  id: "01a0676a-d725-700b-9973-ee2300fa0d68",
  type: "page-type/release",
  slug: "rockapella-motown-more",
  title: "Motown & More",
  partOfCollections: ["artist/rockapella"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2013-03-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4zGjOIzSS64HrZ5Kqy3WGE",
      externalLink: "https://open.spotify.com/album/4zGjOIzSS64HrZ5Kqy3WGE",
    },
  ],
  createdAt: "2026-09-03T13:17:30.277Z",
  updatedAt: "2026-09-24T21:00:29.000Z",
} as const satisfies Release
