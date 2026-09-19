import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplaySpotifySinglesLetSomebodyGoSpotifySingles = {
  id: "01a0b9ee-edec-7bc6-91a6-23d0d6ce481e",
  type: "page-type/track",
  slug: "coldplay-spotify-singles-let-somebody-go-spotify-singles",
  ownLength: 4.052566666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-spotify-singles"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4KiWjFLX5A3oUY40OL0FAh",
      externalLink: "https://open.spotify.com/track/4KiWjFLX5A3oUY40OL0FAh",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Let Somebody Go - Spotify Singles",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "0C8ZW7ezQVs4URX5aX7Kqx", artistName: "Selena Gomez" },
  ],
  trackKey: "letsomebodygospotifysingles|0C8ZW7ezQVs4URX5aX7Kqx,4gzpq5DPGxSnKTe4SA8HAU|243154",
  song: "song/coldplay-let-somebody-go-spotify-singles",
} as const satisfies Track
