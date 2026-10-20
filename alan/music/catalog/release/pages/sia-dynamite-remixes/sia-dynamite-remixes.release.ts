import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaDynamiteRemixes = {
  id: "01a0676a-d71c-7047-a7fa-dadc6655813f",
  type: "page-type/release",
  slug: "sia-dynamite-remixes",
  title: "Dynamite (Remixes)",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-01-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6t6hMOCSo4HcnUbr39Ys9V",
      externalLink: "https://open.spotify.com/album/6t6hMOCSo4HcnUbr39Ys9V",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.268Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
