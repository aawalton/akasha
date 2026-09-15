import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiForgetMyPhone = {
  id: "01a0676a-d71e-702c-942d-7e8182c3f80c",
  type: "release",
  slug: "vinny-marchi-forget-my-phone",
  title: "Forget My Phone",
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  ownLength: 2.595067,
  ownProgress: 2.595067,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2023-04-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "70ramCPVJxIeVe8BJEMNHp",
      externalLink: "https://open.spotify.com/album/70ramCPVJxIeVe8BJEMNHp",
      lastSyncedAt: "2025-10-24",
    },
  ],
} as const satisfies Release
