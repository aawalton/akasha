import type { Song } from "../../song.page-type.ts"

export const auroraRingTheAlarm = {
  id: "019ea4a7-29f1-7235-b97a-2f56610953f7",
  pageTypeSlug: "song",
  slug: "aurora-ring-the-alarm",
  title: "RING THE ALARM",
  artistSlug: "aurora",
  externalId: "d302bbb8-d8d3-4e63-be6b-6817b594ebdc",
  externalLink: "https://musicbrainz.org/work/d302bbb8-d8d3-4e63-be6b-6817b594ebdc",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
