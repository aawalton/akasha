import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayMiracles = {
  id: "01a0ba5d-4c82-761c-8137-aad82fecdf93",
  type: "page-type/song",
  slug: "coldplay-miracles",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0eadf75e-ba5a-4b8b-bca4-7e8e64ee7df9",
      externalLink: "https://musicbrainz.org/work/0eadf75e-ba5a-4b8b-bca4-7e8e64ee7df9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Miracles",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
