import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixComeAlong = {
  id: "01a0676a-d71b-7014-aea7-4c074e55dc08",
  type: "page-type/release",
  slug: "pentatonix-come-along",
  title: "Come Along",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-03-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0gGoGIF1hkBkVpcHYygHsm",
      externalLink: "https://open.spotify.com/album/0gGoGIF1hkBkVpcHYygHsm",
    },
  ],
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
