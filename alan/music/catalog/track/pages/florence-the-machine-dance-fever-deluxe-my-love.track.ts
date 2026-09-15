import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineDanceFeverDeluxeMyLove = {
  id: "01a0a5cd-585f-76dd-bb15-a909365aa672",
  type: "page-type/track",
  slug: "florence-the-machine-dance-fever-deluxe-my-love",
  ownLength: 3.8568,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-dance-fever-deluxe"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1EgLBP2HQsYf9Eh4bmQfWb",
      externalLink: "https://open.spotify.com/track/1EgLBP2HQsYf9Eh4bmQfWb",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "My Love",
} as const satisfies Track
