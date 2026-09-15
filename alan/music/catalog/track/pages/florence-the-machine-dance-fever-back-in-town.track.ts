import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineDanceFeverBackInTown = {
  id: "01a0a5cd-5ad2-70a9-b1f3-5fd88263ac0f",
  type: "track",
  slug: "florence-the-machine-dance-fever-back-in-town",
  ownLength: 3.931,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-dance-fever"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "24S29Mu8QKgCockrZyX6Ha",
      externalLink: "https://open.spotify.com/track/24S29Mu8QKgCockrZyX6Ha",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Back In Town",
} as const satisfies Track
