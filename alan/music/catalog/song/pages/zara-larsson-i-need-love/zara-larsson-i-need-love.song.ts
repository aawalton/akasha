import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonINeedLove = {
  id: "019ea4a2-04bb-7f43-b5b1-721b977f8b7b",
  type: "page-type/song",
  slug: "zara-larsson-i-need-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f4b18f75-8eb2-4370-8301-3c2505613df7",
      externalLink: "https://musicbrainz.org/work/f4b18f75-8eb2-4370-8301-3c2505613df7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Need Love",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
