import type { Song } from "../../song.page-type.ts"

export const siaParanoidAndroid = {
  id: "019ea4ca-f119-7fe9-b8ee-1c1ad1ade7a3",
  pageTypeSlug: "song",
  slug: "sia-paranoid-android",
  title: "Paranoid Android",
  artistSlug: "sia",
  externalId: "1b4ff597-f43f-3dac-9f76-0e7b7f38d0d2",
  externalLink: "https://musicbrainz.org/work/1b4ff597-f43f-3dac-9f76-0e7b7f38d0d2",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
