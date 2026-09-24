import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveFromSpotifyLondonYellowLiveFromSpotifyLondon = {
  id: "01a0b9ee-f40d-7f26-9187-0244fae59ac5",
  type: "page-type/track",
  slug: "coldplay-live-from-spotify-london-yellow-live-from-spotify-london",
  ownLength: 4.207766666666667,
  ownProgress: 4.207766666666667,
  partOfCollections: ["release/coldplay-live-from-spotify-london"],
  status: "completed",
  unit: "unit/minutes",
  title: "Yellow - Live from Spotify London",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "yellowlivefromspotifylondon|4gzpq5DPGxSnKTe4SA8HAU|252466",
  song: "song/coldplay-yellow",
  carriedBy: [
    {
      release: "release/coldplay-live-from-spotify-london",
      discNumber: 1,
      position: 4,
      externalId: "33koOQs551ijjVmLbmrcDc",
      externalLink: "https://open.spotify.com/track/33koOQs551ijjVmLbmrcDc",
    },
  ],
} as const satisfies Track
