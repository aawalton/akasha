import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixShallow = {
  id: "01a0676a-d728-706d-a0fc-7aab272cc8c3",
  type: "page-type/release",
  slug: "pentatonix-shallow",
  title: "Shallow",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-05-31",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3LKj5a1ySvJZysPCkUXYfv",
      externalLink: "https://open.spotify.com/album/3LKj5a1ySvJZysPCkUXYfv",
    },
  ],
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
