import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonIWouldLike = {
  id: "019ea4a2-7ee0-73c7-919b-4e814381d9b8",
  type: "page-type/song",
  slug: "zara-larsson-i-would-like",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fdaa6ab3-c017-4882-9543-98819379b3ae",
      externalLink: "https://musicbrainz.org/work/fdaa6ab3-c017-4882-9543-98819379b3ae",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Would Like",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
