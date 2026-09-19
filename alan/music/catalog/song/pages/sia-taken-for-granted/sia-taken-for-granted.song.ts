import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaTakenForGranted = {
  id: "019ea4cc-02e5-742b-9b26-2bf3df580b56",
  type: "page-type/song",
  slug: "sia-taken-for-granted",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "40cf66d0-8217-4c67-ba9c-8d2d4d7ea92d",
      externalLink: "https://musicbrainz.org/work/40cf66d0-8217-4c67-ba9c-8d2d4d7ea92d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Taken for Granted",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
