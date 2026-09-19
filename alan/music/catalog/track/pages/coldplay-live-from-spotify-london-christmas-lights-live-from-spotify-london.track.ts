import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveFromSpotifyLondonChristmasLightsLiveFromSpotifyLondon = {
  id: "01a0b9ee-f42d-770e-8118-5dfa274fb365",
  type: "page-type/track",
  slug: "coldplay-live-from-spotify-london-christmas-lights-live-from-spotify-london",
  ownLength: 4.47535,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-from-spotify-london"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4QVdnpSO5JGMFOEl6ys4RQ",
      externalLink: "https://open.spotify.com/track/4QVdnpSO5JGMFOEl6ys4RQ",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Christmas Lights - Live from Spotify London",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "christmaslightslivefromspotifylondon|4gzpq5DPGxSnKTe4SA8HAU|268521",
  song: "song/coldplay-christmas-lights",
} as const satisfies Track
