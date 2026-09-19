import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayParachutesShiver = {
  id: "01a0b9ee-e94c-7ffd-ab5e-dd4cd21c383a",
  type: "page-type/track",
  slug: "coldplay-parachutes-shiver",
  ownLength: 5.07,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-parachutes"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0qksx8mV28lztYIZ1om8ml",
      externalLink: "https://open.spotify.com/track/0qksx8mV28lztYIZ1om8ml",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Shiver",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "shiver|4gzpq5DPGxSnKTe4SA8HAU|304200",
  song: "song/coldplay-shiver",
} as const satisfies Track
