import type { Song } from "../../song.page-type.ts"

export const siaTheWhisperer = {
  id: "019ea4cb-b2a8-765c-b772-14bcb8ce0d5c",
  pageTypeSlug: "song",
  slug: "sia-the-whisperer",
  title: "The Whisperer",
  artistSlug: "sia",
  externalId: "374ab399-004a-41e1-8d00-502b1f60fab9",
  externalLink: "https://musicbrainz.org/work/374ab399-004a-41e1-8d00-502b1f60fab9",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
