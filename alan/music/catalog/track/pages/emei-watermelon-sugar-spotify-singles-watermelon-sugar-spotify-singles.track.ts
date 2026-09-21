import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiWatermelonSugarSpotifySinglesWatermelonSugarSpotifySingles = {
  id: "01a0c43e-7a2d-726e-86e4-5ef61e688c2a",
  type: "page-type/track",
  slug: "emei-watermelon-sugar-spotify-singles-watermelon-sugar-spotify-singles",
  ownLength: 2.1609333333333334,
  ownProgress: 2.1609333333333334,
  partOfCollections: ["release/emei-watermelon-sugar-spotify-singles"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0kIsnEg0TzJTsb6wTVHSeG",
      externalLink: "https://open.spotify.com/track/0kIsnEg0TzJTsb6wTVHSeG",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Watermelon Sugar - Spotify Singles",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "watermelonsugarspotifysingles|7E2aQQjErJocovYFjYLzWU|129656",
  song: "song/emei-watermelon-sugar-spotify-singles",
  carriedBy: [
    {
      release: "release/emei-watermelon-sugar-spotify-singles",
      discNumber: 1,
      position: 1,
      externalId: "0kIsnEg0TzJTsb6wTVHSeG",
      externalLink: "https://open.spotify.com/track/0kIsnEg0TzJTsb6wTVHSeG",
    },
  ],
} as const satisfies Track
