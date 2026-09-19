import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioNeverAQuestion = {
  id: "019ea4f8-49cd-750d-b12d-281a44ffe2a6",
  type: "page-type/song",
  slug: "jessica-baio-never-a-question",
  title: "never a question",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5604f87b-eab0-4dbf-9625-5e6e2c5e7e6b",
      externalLink: "https://musicbrainz.org/recording/5604f87b-eab0-4dbf-9625-5e6e2c5e7e6b",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
