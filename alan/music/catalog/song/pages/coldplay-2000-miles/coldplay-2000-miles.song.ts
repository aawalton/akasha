import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplay2000Miles = {
  id: "01a0ba5d-48d9-70a5-8a58-ac1bdf7fdd1c",
  type: "page-type/song",
  slug: "coldplay-2000-miles",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e0ef291a-ab09-31f9-ba7b-3312b4782410",
      externalLink: "https://musicbrainz.org/work/e0ef291a-ab09-31f9-ba7b-3312b4782410",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "2000 Miles",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
