import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonSanktaLucia = {
  id: "019ea4a0-f2c2-7489-84f4-5c3d0b0f99f8",
  type: "page-type/song",
  slug: "zara-larsson-sankta-lucia",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b1fca655-e983-49c1-a0ae-4b1e941b5fde",
      externalLink: "https://musicbrainz.org/work/b1fca655-e983-49c1-a0ae-4b1e941b5fde",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sankta Lucia",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
