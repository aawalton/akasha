import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplaySpeedOfSoundThingsIDontUnderstand = {
  id: "01a0b9ee-fff7-7764-afe8-0ea6456f892a",
  type: "page-type/track",
  slug: "coldplay-speed-of-sound-things-i-dont-understand",
  ownLength: 4.9271,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-speed-of-sound"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5AeARoYmk0okMRWAlPHLzj",
      externalLink: "https://open.spotify.com/track/5AeARoYmk0okMRWAlPHLzj",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Things I Don't Understand",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "thingsidontunderstand|4gzpq5DPGxSnKTe4SA8HAU|295626",
  song: "song/coldplay-things-i-dont-understand",
} as const satisfies Track
