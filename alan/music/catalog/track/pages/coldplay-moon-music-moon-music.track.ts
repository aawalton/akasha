import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicMoonMusic = {
  id: "01a0b9ee-c8ac-7f72-98dd-a7258b50774d",
  type: "page-type/track",
  slug: "coldplay-moon-music-moon-music",
  ownLength: 4.607933333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-moon-music"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "41FNZsY7w7KaTQ2bjxdR6w",
      externalLink: "https://open.spotify.com/track/41FNZsY7w7KaTQ2bjxdR6w",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "MOON MUSiC",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "7yxi31szvlbwvKq9dYOmFI", artistName: "Jon Hopkins" },
  ],
  trackKey: "moonmusic|4gzpq5DPGxSnKTe4SA8HAU,7yxi31szvlbwvKq9dYOmFI|276476",
  song: "song/coldplay-moon-music",
} as const satisfies Track
