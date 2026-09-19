import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplaySpeedOfSound2SpeedOfSoundLive = {
  id: "01a0b9ef-001f-7f0f-99ef-0b574fe85d13",
  type: "page-type/track",
  slug: "coldplay-speed-of-sound-2-speed-of-sound-live",
  ownLength: 4.7499666666666664,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-speed-of-sound-2"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4IGUhtEPrvDVQfpHp9QFPj",
      externalLink: "https://open.spotify.com/track/4IGUhtEPrvDVQfpHp9QFPj",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Speed of Sound - Live",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "speedofsoundlive|4gzpq5DPGxSnKTe4SA8HAU|284998",
  song: "song/coldplay-speed-of-sound",
} as const satisfies Track
