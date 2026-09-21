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
} as const satisfies Release
