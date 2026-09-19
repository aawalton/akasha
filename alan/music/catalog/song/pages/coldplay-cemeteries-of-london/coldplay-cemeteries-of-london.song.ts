import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayCemeteriesOfLondon = {
  id: "01a0ba5d-4994-70a5-864b-3dd5470d2089",
  type: "page-type/song",
  slug: "coldplay-cemeteries-of-london",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ef4f90e1-ba3b-3a4b-9fa0-c86a2af5cfe1",
      externalLink: "https://musicbrainz.org/work/ef4f90e1-ba3b-3a4b-9fa0-c86a2af5cfe1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cemeteries of London",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
