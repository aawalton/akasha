import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaHeyBoyHeyBoy = {
  id: "01a0a59c-2d56-7713-bc21-4f3213cc0388",
  type: "page-type/track",
  slug: "sia-hey-boy-hey-boy",
  ownLength: 2.49115,
  ownProgress: 0,
  partOfCollections: ["release/sia-hey-boy"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4GMwkXRXJBedJMmvmltk0Q",
      externalLink: "https://open.spotify.com/track/4GMwkXRXJBedJMmvmltk0Q",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Hey Boy",
} as const satisfies Track
