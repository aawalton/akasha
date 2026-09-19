import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiPinkInTheNight = {
  id: "019f0e9f-70ed-7c63-806a-90e4d5fdb357",
  type: "page-type/song",
  slug: "mitski-pink-in-the-night",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "41e141d0-7d35-42f1-b844-7bb45c0948ba",
      externalLink: "https://musicbrainz.org/work/41e141d0-7d35-42f1-b844-7bb45c0948ba",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Pink in the Night",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
