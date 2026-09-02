import type { Song } from "../../song.page-type.ts"

export const auroraTheThing = {
  id: "019ea4a5-4912-7f87-ab0f-09fbe4e672d5",
  pageTypeSlug: "song",
  slug: "aurora-the-thing",
  title: "THE THING",
  artistSlug: "aurora",
  externalId: "59d6c953-01f0-48c8-a90a-09d7914ec078",
  externalLink: "https://musicbrainz.org/work/59d6c953-01f0-48c8-a90a-09d7914ec078",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
