import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioAllISawWasYou = {
  id: "019ea4f6-dac8-7409-93a6-9297d0dcda69",
  type: "page-type/song",
  slug: "jessica-baio-all-i-saw-was-you",
  title: "ALL I SAW WAS YOU",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4141cf18-35b5-4b66-ab85-3b881f0b6600",
      externalLink: "https://musicbrainz.org/recording/4141cf18-35b5-4b66-ab85-3b881f0b6600",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
