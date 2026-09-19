import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLetSomebodyGoLetSomebodyGo = {
  id: "01a0b9ee-edc4-713a-bafc-4bfcd9ea686f",
  type: "page-type/track",
  slug: "coldplay-let-somebody-go-let-somebody-go",
  ownLength: 4.026583333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-let-somebody-go"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4ImOgexLVNBnBfK1Gzq7Jw",
      externalLink: "https://open.spotify.com/track/4ImOgexLVNBnBfK1Gzq7Jw",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Let Somebody Go",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "0C8ZW7ezQVs4URX5aX7Kqx", artistName: "Selena Gomez" },
  ],
  trackKey: "letsomebodygo|0C8ZW7ezQVs4URX5aX7Kqx,4gzpq5DPGxSnKTe4SA8HAU|241595",
  song: "song/coldplay-let-somebody-go",
} as const satisfies Track
