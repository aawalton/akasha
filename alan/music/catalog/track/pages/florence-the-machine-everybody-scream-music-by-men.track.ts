import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineEverybodyScreamMusicByMen = {
  id: "01a0a5cd-4a44-70c5-8b2c-fbaf48a97954",
  type: "track",
  slug: "florence-the-machine-everybody-scream-music-by-men",
  ownLength: 4.5234,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-everybody-scream"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1oHxIq2EEXHzPcNo3MJQjQ",
      externalLink: "https://open.spotify.com/track/1oHxIq2EEXHzPcNo3MJQjQ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Music by Men",
} as const satisfies Track
