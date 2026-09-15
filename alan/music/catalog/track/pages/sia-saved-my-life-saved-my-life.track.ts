import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaSavedMyLifeSavedMyLife = {
  id: "01a0a59c-30ba-7863-a6f6-fee42e44c3e4",
  type: "page-type/track",
  slug: "sia-saved-my-life-saved-my-life",
  ownLength: 3.9255166666666668,
  ownProgress: 0,
  partOfCollections: ["release/sia-saved-my-life"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5cpw6QKJcoXzpNBLNUJx2i",
      externalLink: "https://open.spotify.com/track/5cpw6QKJcoXzpNBLNUJx2i",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Saved My Life",
} as const satisfies Track
