import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineDanceFeverMyLove = {
  id: "01a0a5cd-5bf6-7047-9845-ccfffef07948",
  type: "track",
  slug: "florence-the-machine-dance-fever-my-love",
  ownLength: 3.8568,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-dance-fever"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7jQuTeWHCKKLc2QV6MPunK",
      externalLink: "https://open.spotify.com/track/7jQuTeWHCKKLc2QV6MPunK",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "My Love",
} as const satisfies Track
