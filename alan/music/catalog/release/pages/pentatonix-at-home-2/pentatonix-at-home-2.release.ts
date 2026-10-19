import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixAtHome2 = {
  id: "01a0676a-d717-7039-b60a-597c26d5bab8",
  type: "page-type/release",
  slug: "pentatonix-at-home-2",
  title: "At Home",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-10-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "27y7LkojjT5POmnZeWIttg",
      externalLink: "https://open.spotify.com/album/27y7LkojjT5POmnZeWIttg",
    },
  ],
  createdAt: "2026-09-03T13:17:30.263Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
