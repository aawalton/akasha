import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsBones = {
  id: "01a0676a-d719-7020-a77a-50f153f57872",
  type: "page-type/release",
  slug: "imagine-dragons-bones",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2022-03-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Q9SnHWPNEjVM0LrBFvJ1q",
      externalLink: "https://open.spotify.com/album/1Q9SnHWPNEjVM0LrBFvJ1q",
    },
  ],
  title: "Bones",
} as const satisfies Release
