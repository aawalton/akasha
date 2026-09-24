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
} as const satisfies Release
