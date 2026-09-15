import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaHeyBoySavedMyLife = {
  id: "01a0a59c-2db6-7d51-a7af-391771e0fd6c",
  type: "page-type/track",
  slug: "sia-hey-boy-saved-my-life",
  ownLength: 3.9255166666666668,
  ownProgress: 0,
  partOfCollections: ["release/sia-hey-boy"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0bktiWVfE5y0KTnH4RGPHT",
      externalLink: "https://open.spotify.com/track/0bktiWVfE5y0KTnH4RGPHT",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Saved My Life",
} as const satisfies Track
