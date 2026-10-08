import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const yaelokreHearken = {
  id: "01a0676a-d720-700c-9b93-7e5eae958628",
  type: "page-type/release",
  slug: "yaelokre-hearken",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/yaelokre"],
  position: 0,
  publishedAt: "2026-02-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "76esxIQUhXuZW0d7VdNy2g",
      externalLink: "https://open.spotify.com/album/76esxIQUhXuZW0d7VdNy2g",
      lastSyncedAt: "2026-03-02",
    },
  ],
  title: "Hearken",
  createdAt: "2026-09-03T13:17:30.272Z",
  updatedAt: "2026-09-23T14:01:20.000Z",
} as const satisfies Release
