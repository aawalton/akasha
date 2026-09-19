import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioLoveSNotPain = {
  id: "019ea4f8-2404-7998-a8a3-91d50f0eac50",
  type: "page-type/song",
  slug: "jessica-baio-love-s-not-pain",
  title: "love's not pain",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "73215ee7-7a19-46cc-ba3a-a4a352202539",
      externalLink: "https://musicbrainz.org/recording/73215ee7-7a19-46cc-ba3a-a4a352202539",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
