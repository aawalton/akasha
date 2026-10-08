import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkTwoFaced = {
  id: "01a0676a-d72f-7027-9095-2cd04bd79b4c",
  type: "page-type/release",
  slug: "linkin-park-two-faced",
  title: "Two Faced",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 3.059733,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-11-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4kksZlvAqineklmhltdTFe",
      externalLink: "https://open.spotify.com/album/4kksZlvAqineklmhltdTFe",
    },
  ],
  createdAt: "2026-09-03T13:17:30.287Z",
  updatedAt: "2026-09-15T16:37:53.000Z",
} as const satisfies Release
