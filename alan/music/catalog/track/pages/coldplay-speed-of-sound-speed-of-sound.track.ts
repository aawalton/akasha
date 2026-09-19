import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplaySpeedOfSoundSpeedOfSound = {
  id: "01a0b9ee-ffd1-7539-a8b9-9a0bd1952c35",
  type: "page-type/track",
  slug: "coldplay-speed-of-sound-speed-of-sound",
  ownLength: 4.807333333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-speed-of-sound"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7nkF0Ti82lcxlsUcNATQa2",
      externalLink: "https://open.spotify.com/track/7nkF0Ti82lcxlsUcNATQa2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Speed of Sound",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "speedofsound|4gzpq5DPGxSnKTe4SA8HAU|288440",
  song: "song/coldplay-speed-of-sound",
} as const satisfies Track
