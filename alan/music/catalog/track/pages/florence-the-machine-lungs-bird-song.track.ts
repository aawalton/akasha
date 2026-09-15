import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineLungsBirdSong = {
  id: "01a0a5cd-73e4-73af-ae56-cc480854f561",
  type: "page-type/track",
  slug: "florence-the-machine-lungs-bird-song",
  ownLength: 2.926,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-lungs"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1XbrnMyEFOZxaMwplryTQ8",
      externalLink: "https://open.spotify.com/track/1XbrnMyEFOZxaMwplryTQ8",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Bird Song",
} as const satisfies Track
