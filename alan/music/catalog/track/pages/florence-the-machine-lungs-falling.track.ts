import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineLungsFalling = {
  id: "01a0a5cd-7427-73b5-930a-6829e7c272c7",
  type: "page-type/track",
  slug: "florence-the-machine-lungs-falling",
  ownLength: 3.5848833333333334,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-lungs"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1kzR6WiyF7aCtbjUsQZ4ID",
      externalLink: "https://open.spotify.com/track/1kzR6WiyF7aCtbjUsQZ4ID",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Falling",
} as const satisfies Track
