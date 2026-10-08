import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiForgetMyPhone = {
  id: "01a0676a-d71e-702c-942d-7e8182c3f80c",
  type: "page-type/release",
  slug: "vinny-marchi-forget-my-phone",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2023-04-14",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "70ramCPVJxIeVe8BJEMNHp",
      externalLink: "https://open.spotify.com/album/70ramCPVJxIeVe8BJEMNHp",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Forget My Phone",
  createdAt: "2026-09-03T13:17:30.270Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
