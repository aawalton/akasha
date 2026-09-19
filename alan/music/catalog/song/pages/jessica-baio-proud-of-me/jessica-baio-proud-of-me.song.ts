import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioProudOfMe = {
  id: "019ea4f8-8c34-7d2d-83de-f03575331b9a",
  type: "page-type/song",
  slug: "jessica-baio-proud-of-me",
  title: "proud of me",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8d6aa75b-2554-4fd9-bfb3-e5ca5a6f113f",
      externalLink: "https://musicbrainz.org/recording/8d6aa75b-2554-4fd9-bfb3-e5ca5a6f113f",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
