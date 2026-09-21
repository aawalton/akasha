import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiComeOnComeOn = {
  id: "01a0676a-d71b-7019-ac29-3a0cce4b8eef",
  type: "page-type/release",
  slug: "vinny-marchi-come-on-come-on",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2022-07-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3aXnOVCu2V9V20oVmwWWs2",
      externalLink: "https://open.spotify.com/album/3aXnOVCu2V9V20oVmwWWs2",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Come On! Come On!",
} as const satisfies Release
