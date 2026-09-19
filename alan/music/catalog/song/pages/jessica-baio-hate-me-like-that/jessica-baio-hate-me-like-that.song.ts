import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioHateMeLikeThat = {
  id: "019ea4f7-a059-7115-b19a-4b5b21c25182",
  type: "page-type/song",
  slug: "jessica-baio-hate-me-like-that",
  title: "hate me like that",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9aaf93c9-a448-4c21-827e-4ddda346ffd3",
      externalLink: "https://musicbrainz.org/recording/9aaf93c9-a448-4c21-827e-4ddda346ffd3",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
