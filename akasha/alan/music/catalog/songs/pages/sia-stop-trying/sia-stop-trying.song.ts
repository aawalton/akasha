import type { Song } from "../../song.page-type.ts"

export const siaStopTrying = {
  id: "019ea4cd-2d94-73e2-90f1-4dd912a37742",
  pageTypeSlug: "song",
  slug: "sia-stop-trying",
  title: "Stop Trying",
  artistSlug: "sia",
  externalId: "8f2364cd-a9ef-4045-a936-5aaa763ba29e",
  externalLink: "https://musicbrainz.org/work/8f2364cd-a9ef-4045-a936-5aaa763ba29e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
