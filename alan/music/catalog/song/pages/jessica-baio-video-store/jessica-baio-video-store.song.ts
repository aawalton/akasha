import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioVideoStore = {
  id: "019ea4f9-1004-7d32-a517-5fd9acadb634",
  type: "page-type/song",
  slug: "jessica-baio-video-store",
  title: "video store",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ba36395a-76bd-48bd-8a35-80c65d114f10",
      externalLink: "https://musicbrainz.org/recording/ba36395a-76bd-48bd-8a35-80c65d114f10",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
