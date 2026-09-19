import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioBreakUpWithMe = {
  id: "019ea4f7-35ed-7e30-87ce-c527af9249ff",
  type: "page-type/song",
  slug: "jessica-baio-break-up-with-me",
  title: "break up with me",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "27a1b541-ccc2-4364-b037-6dba810e84da",
      externalLink: "https://musicbrainz.org/recording/27a1b541-ccc2-4364-b037-6dba810e84da",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
