import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveFromSpotifyLondonYellowLiveFromSpotifyLondon = {
  id: "01a0b9ee-f40d-7f26-9187-0244fae59ac5",
  type: "page-type/track",
  slug: "coldplay-live-from-spotify-london-yellow-live-from-spotify-london",
  ownLength: 4.207766666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-from-spotify-london"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "33koOQs551ijjVmLbmrcDc",
      externalLink: "https://open.spotify.com/track/33koOQs551ijjVmLbmrcDc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Yellow - Live from Spotify London",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "yellowlivefromspotifylondon|4gzpq5DPGxSnKTe4SA8HAU|252466",
} as const satisfies Track
