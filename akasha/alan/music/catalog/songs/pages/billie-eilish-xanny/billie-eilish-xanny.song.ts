import type { Song } from "../../song.page-type.ts"

export const billieEilishXanny = {
  id: "019ea4aa-23aa-72b0-bab5-7561c9fa91eb",
  pageTypeSlug: "song",
  slug: "billie-eilish-xanny",
  title: "xanny",
  artistSlug: "billie-eilish",
  externalId: "7aec9a80-2c88-4da7-af9b-39f68142c00b",
  externalLink: "https://musicbrainz.org/work/7aec9a80-2c88-4da7-af9b-39f68142c00b",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
