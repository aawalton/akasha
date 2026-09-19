import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioExcuses = {
  id: "019ea4f7-7b29-76d1-addf-b0724f7914c7",
  type: "page-type/song",
  slug: "jessica-baio-excuses",
  title: "excuses",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6db2fdc6-4a76-4ffd-bd6f-651bf4af9773",
      externalLink: "https://musicbrainz.org/recording/6db2fdc6-4a76-4ffd-bd6f-651bf4af9773",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
