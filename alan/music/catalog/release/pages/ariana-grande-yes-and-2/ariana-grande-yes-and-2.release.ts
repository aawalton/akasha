import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeYesAnd2 = {
  id: "01a0676a-d731-704c-905c-e094ec188698",
  type: "page-type/release",
  slug: "ariana-grande-yes-and-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2024-02-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7cE0lgNHmBxutHd5g4D3q8",
      externalLink: "https://open.spotify.com/album/7cE0lgNHmBxutHd5g4D3q8",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "yes, and?",
} as const satisfies Release
